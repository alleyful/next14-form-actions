'use server';
import bcrypt from 'bcrypt';
import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants';
import db from '@/lib/db';
import { z } from 'zod';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

const checkEmailExists = async (email: string) => {
  const user = db.user.findUnique({
    where: {
      email
    },
    select: {
      id: true
    }
  });

  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(checkEmailExists, 'An account with this email dose not exist'),
  password: z.string()
});

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email
      },
      select: {
        id: true,
        password: true
      }
    });

    const ok = await bcrypt.compare(result.data.password, user!.password);

    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();

      redirect('/');
    } else {
      return {
        fieldErrors: {
          password: ['Password is incorrect'],
          email: []
        }
      };
    }
  }
}