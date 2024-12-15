'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebounce((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    startTransition(() => {
      router.push(`/search?${params.toString()}`);
    });
  }, 300);

  return (
    <div className='relative w-full max-w-xl mx-auto'>
      <MagnifyingGlassIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
      <input
        type='search'
        placeholder='트윗 검색하기...'
        className='w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
        onChange={e => handleSearch(e.target.value)}
        defaultValue={searchParams.get('q') ?? ''}
      />
      {isPending && (
        <div className='absolute right-3 top-1/2 -translate-y-1/2'>
          <div className='w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin' />
        </div>
      )}
    </div>
  );
}
