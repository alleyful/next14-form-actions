'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className='bg-blue-500 text-white py-3 px-5 rounded-full hover:bg-blue-600  disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed'
    >
      {pending ? 'Loading...' : text}
    </button>
  );
}
