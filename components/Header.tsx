// components/Header.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { TweetTalkLogo } from './TweetTalkLogo';
// import { Button } from './common/Button';
// import { Input } from './common/Input';
import { useState } from 'react';
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {Button} from './common/Button';
import {Input }from './common/Input';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  const isSearchPage = pathname.startsWith('/search');
  const isProfilePage = pathname.startsWith('/users');

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  return (
    <header className='sticky top-0 z-50 border-b border-gray-800 bg-gray-900 px-4 py-2'>
      <div className='mx-auto flex max-w-6xl items-center justify-between'>
        <div className='w-auto'>
          {isSearchPage || isProfilePage ? (
            <Button variant='ghost' size='icon' onClick={() => router.back()}>
              <ArrowLeftIcon className='h-5 w-5' />
            </Button>
          ) : (
            <Link href='/' className='hover:opacity-80 transition-opacity'>
              <TweetTalkLogo />
            </Link>
          )}
        </div>

        <form
          onSubmit={handleSearch}
          className='flex w-full max-w-md items-center gap-2 px-4'
        >
          <Input
            type='search'
            placeholder='검색어를 입력하세요'
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
          <Button type='submit' variant='ghost' size='icon'>
            <MagnifyingGlassIcon className='h-5 w-5' />
          </Button>
        </form>

        <Link href='/profile'>
          <Button variant='ghost' size='icon'>
            <UserIcon className='h-5 w-5' />
          </Button>
        </Link>
      </div>
    </header>
  );
}
