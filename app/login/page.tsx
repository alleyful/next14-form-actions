'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useFormState } from 'react-dom';
import { handleForm } from './actions';
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid';

export default function Login() {
  const [state, dispatch] = useFormState(handleForm, {
    errors: {
      username: [],
      email: [],
      password: []
    }
  });

  return (
    <div className='flex flex-col gap-10 py-20 px-6'>
      <div className='flex gap-2 justify-center font-medium'>
        <span className='text-9xl'>🔐</span>
      </div>

      <form action={dispatch} className='flex flex-col gap-3'>
        <Input
          name='email'
          type='email'
          placeholder='Email'
          icon={<EnvelopeIcon className='w-5 h-5 text-gray-400' />}
          required
          errors={state?.errors?.email ?? []}
        />
        <Input
          name='username'
          type='text'
          placeholder='Username'
          icon={<UserIcon className='w-5 h-5 text-gray-400' />}
          required
          errors={state?.errors?.username ?? []}
        />
        <Input
          name='password'
          type='password'
          placeholder='Password'
          icon={<LockClosedIcon className='w-5 h-5 text-gray-400' />}
          required
          errors={state?.errors?.password ?? []}
        />
        <Button text='로그인' />
      </form>

      {state?.success && (
        <div className='flex items-center gap-2 text-white bg-green-500 rounded-md p-4'>
          <CheckCircleIcon className='w-6 h-6' />
          로그인 성공
        </div>
      )}
    </div>
  );
}
