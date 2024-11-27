'use server';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  USERNAME_MIN_LENGTH
} from '@/lib/constants';
import { z } from 'zod';

const checkEmail = (email: string) => email.includes('@zod.com');

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(checkEmail, 'Only @zod.com emails are allowed'),
  username: z
    .string()
    .min(USERNAME_MIN_LENGTH, 'username must be at least 5 characters long'),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, 'password must be at least 10 characters long')
    .regex(
      PASSWORD_REGEX,
      'Password should contain at least one number (0123456789)'
    )
});

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password')
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten().fieldErrors
    };
  } else {
    return { success: true };
  }
}
