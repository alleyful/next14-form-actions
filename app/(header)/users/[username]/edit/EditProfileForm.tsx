'use client';

import { useFormState } from 'react-dom';
import { updateProfile } from './actions';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { User } from '@prisma/client';

export default function EditProfileForm({ user }: { user: Partial<User> }) {
  const [state, action] = useFormState(updateProfile, null);

  return (
    <form action={action} className='space-y-4'>
      <Input
        name='username'
        placeholder='사용자 이름'
        defaultValue={user.username}
        errors={state?.error?.fieldErrors?.username}
      />
      <Input
        name='email'
        type='email'
        placeholder='이메일'
        defaultValue={user.email}
        errors={state?.error?.fieldErrors?.email}
      />
      <textarea
        name='bio'
        placeholder='자기소개'
        defaultValue={user.bio ?? ''}
        className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <div className='border-t pt-4'>
        <h2 className='text-lg font-semibold mb-4'>비밀번호 변경</h2>
        <Input
          name='currentPassword'
          type='password'
          placeholder='현재 비밀번호'
          errors={state?.error?.fieldErrors?.currentPassword}
        />
        <Input
          name='newPassword'
          type='password'
          placeholder='새 비밀번호'
          errors={state?.error?.fieldErrors?.newPassword}
        />
      </div>
      <Button text='저장하기' />
    </form>
  );
}
