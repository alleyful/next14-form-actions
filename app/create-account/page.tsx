'use client';

import { useFormState } from 'react-dom';
import { createAccount } from './actions';
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon
} from '@heroicons/react/24/solid';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className='flex flex-col gap-10 py-20 px-6'>
      <div className='flex gap-2 justify-center font-medium'>
        <span className='text-9xl'>😀</span>
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
          name='username'
          type='text'
          placeholder='Username'
          icon={<UserIcon className='w-5 h-5 text-gray-400' />}
          required
          errors={state?.fieldErrors.username}
        />
        <Input
          name='password'
          type='password'
          placeholder='Password'
          icon={<LockClosedIcon className='w-5 h-5 text-gray-400' />}
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name='confirm_password'
          type='password'
          placeholder='Confirm Password'
          icon={<LockClosedIcon className='w-5 h-5 text-gray-400' />}
          required
          errors={state?.fieldErrors.confirm_password}
        />
        <Button text='회원가입' />
      </form>
    </div>
  );
}
