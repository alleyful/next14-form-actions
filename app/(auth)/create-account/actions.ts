'use server';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  USERNAME_MIN_LENGTH
} from '@/lib/constants';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import getSession from '@/lib/session';

const checkPasswords = ({
  password,
  confirm_password
}: {
  password: string;
  confirm_password: string;
}) => {
  return password === confirm_password;
};

const formSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(USERNAME_MIN_LENGTH),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string()
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email
      },
      select: {
        id: true
      }
    });

    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: 'Email already exists',
        path: ['email'],
        fatal: true
      });

      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    path: ['confirm_password'],
    message: 'Passwords do not match'
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password')
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const password = await bcrypt.hash(data.password as string, 12);

    const user = await db.user.create({
      data: {
        email: result.data.email,
        username: result.data.username,
        password
      },
      select: {
        id: true
      }
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();

    redirect('/profile');
  }
}
