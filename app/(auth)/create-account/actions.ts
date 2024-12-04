'use server';
import { typeToFlattenedError, z } from 'zod';
import bcrypt from 'bcrypt';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  USERNAME_MIN_LENGTH
} from '@/lib/constants';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { isEmailExist, isUsernameExist } from '@/service/userService';

const checkPasswords = ({
  password,
  confirm_password
}: {
  password: string;
  confirm_password: string;
}) => {
  return password === confirm_password;
};

const createAccountSchema = z
  .object({
    email: z
      .string({
        required_error: 'Email is required.'
      })
      .trim()
      .email('Please enter a valid email address.')
      .refine(
        email => email.includes('@zod.com'),
        'Only @zod.com email addresses are allowed.'
      ),

    username: z
      .string({
        invalid_type_error: 'Username must be a string.',
        required_error: 'Username is required.'
      })
      .trim()
      .min(
        USERNAME_MIN_LENGTH,
        `Username should be at least ${USERNAME_MIN_LENGTH} characters long.`
      ),

    password: z
      .string({
        required_error: 'Password is required.'
      })
      .trim()
      .min(
        PASSWORD_MIN_LENGTH,
        `Password should be at least ${PASSWORD_MIN_LENGTH} characters long.`
      )
      .regex(
        PASSWORD_REGEX,
        'Password should contain at least one number (0-9).'
      )
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await isUsernameExist(username);
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: 'This username is already taken',
        path: ['username'],
        fatal: true
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await isEmailExist(email);
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: 'This email is already taken',
        path: ['email'],
        fatal: true
      });
      return z.NEVER;
    }
  });

interface FormState {
  isSuccess: boolean;
  error: typeToFlattenedError<
    { email: string; username: string; password: string },
    string
  > | null;
}

export async function createAccount(
  _: unknown,
  formData: FormData
): Promise<FormState> {
  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password')
  };

  const result = await createAccountSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      error: result.error.flatten(),
      isSuccess: false
    };
  }
  const hashedPassword = await bcrypt.hash(result.data.password, 12);

  const user = await db.user.create({
    data: {
      email: result.data.email,
      username: result.data.username,
      password: hashedPassword
    },
    select: {
      id: true
    }
  });

  const session = await getSession();
  session.id = user.id;
  await session.save();

  redirect('/');
}
