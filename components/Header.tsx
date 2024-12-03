// components/Header.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserIcon } from '@heroicons/react/24/solid';

export default function Header() {
  const router = useRouter();

  return (
    <header className='fixed left-0 top-0 bg-gray-50 border-b px-4 py-2 w-full'>
      <div className='flex items-center justify-between'>
        <nav className='flex items-center justify-between'>
          <button
            onClick={() => router.back()}
            className='p-2 hover:bg-gray-100 rounded-full'
          >
            <svg
              className='w-6 h-6 text-gray-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          <Link href='/' className='p-2 hover:bg-gray-100 rounded-full'>
            <svg
              className='w-6 h-6 text-blue-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>
          </Link>

          <button
            onClick={() => router.forward()}
            className='p-2 hover:bg-gray-100 rounded-full'
          >
            <svg
              className='w-6 h-6 text-gray-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </nav>

        <div className='flex items-center'>
          <Link href='/profile'>
            <div className='flex items-center justify-center w-8 h-8 rounded-full bg-blue-500'>
              <UserIcon className='w-6 h-6 text-white' />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
