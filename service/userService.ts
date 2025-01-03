'use server';

import db from '@/lib/db';

export const isEmailExist = async (email: string): Promise<boolean> => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true }
  });
  return Boolean(user);
};

export const isUsernameExist = async (username: string): Promise<boolean> => {
  const user = await db.user.findUnique({
    where: { username },
    select: { id: true }
  });
  return Boolean(user);
};

export async function getUserByUsername(username: string) {
  return db.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      email: true,
      bio: true
    }
  });
}
