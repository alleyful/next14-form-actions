'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import { getSession } from '@/lib/session';

const editProfileSchema = z
  .object({
    username: z.string().min(3, '사용자 이름은 3자 이상이어야 합니다'),
    email: z.string().email('올바른 이메일 형식이 아닙니다'),
    bio: z.string().optional(),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(6, '새 비밀번호는 6자 이상이어야 합니다')
      .optional()
  })
  .refine(
    data => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: '현재 비밀번호를 입력해주세요',
      path: ['currentPassword']
    }
  );

// 에러 타입 정의
type ActionState = {
  error?: {
    fieldErrors: {
      [key: string]: string[];
    };
  };
};

export async function updateProfile(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState | null> {
  const session = await getSession();
  if (!session.id) {
    return { error: { fieldErrors: { form: ['Unauthorized'] } } };
  }

  const user = await db.user.findUnique({
    where: { id: session.id },
    select: { id: true, password: true }
  });

  const parsed = editProfileSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    bio: formData.get('bio'),
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword')
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }

  const { currentPassword, newPassword, ...data } = parsed.data;

  if (currentPassword && newPassword) {
    const isValid = await bcrypt.compare(currentPassword, user!.password);
    if (!isValid) {
      return {
        error: {
          fieldErrors: { currentPassword: ['비밀번호가 일치하지 않습니다'] }
        }
      };
    }
    await db.user.update({
      where: { id: session.id },
      data: {
        ...data,
        password: await bcrypt.hash(newPassword, 12)
      }
    });
    revalidatePath(`/users/${data.username}`);
    redirect(`/users/${data.username}`);
  }

  await db.user.update({
    where: { id: session.id },
    data
  });

  revalidatePath(`/users/${data.username}`);
  redirect(`/users/${data.username}`);
}
