'use client';

import { useFormState } from 'react-dom';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { logIn } from './actions';
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid';
// import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from '@/lib/constants';

const initialState = {
  success: false,
  error: undefined
};

export default function Login() {
  const [state, dispatch] = useFormState(logIn, initialState);

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
          errors={state.error?.email}
        />
        <Input
          name='username'
          type='text'
          placeholder='Username'
          icon={<UserIcon className='w-5 h-5 text-gray-400' />}
          required
          // minLength={USERNAME_MIN_LENGTH}
          errors={state.error?.username}
        />
        <Input
          name='password'
          type='password'
          placeholder='Password'
          icon={<LockClosedIcon className='w-5 h-5 text-gray-400' />}
          required
          // minLength={PASSWORD_MIN_LENGTH}
          errors={state.error?.password}
        />
        <Button text='로그인' />
      </form>

      {state.success && (
        <div className='flex items-center gap-2 text-white bg-green-500 rounded-md p-4'>
          <CheckCircleIcon className='w-6 h-6' />
          로그인 성공
        </div>
      )}
    </div>
  );
}
