'use client';

import { useFormState } from 'react-dom';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { logIn } from './actions';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';

export default function Login() {
  const [state, dispatch] = useFormState(logIn, null);

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
          errors={state?.fieldErrors.email}
        />

        <Input
          name='password'
          type='password'
          placeholder='Password'
          icon={<LockClosedIcon className='w-5 h-5 text-gray-400' />}
          required
          errors={state?.fieldErrors.password}
        />
        <Button text='로그인' />
      </form>
    </div>
  );
}
