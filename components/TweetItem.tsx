'use client';

import Link from 'next/link';
import { formatToTimeAgo } from '@/lib/utils';
import { User } from '@prisma/client';
import { useParams } from 'next/navigation';

export default function TweetItem({
  tweet,
  created_at,
  id,
  user
}: {
  tweet: string;
  created_at: Date;
  id: number;
  user: User;
}) {
  const params = useParams();
  const isCurrentUser = params.username === user.username;

  return (
    <div className='flex flex-col px-6 py-4 rounded-2xl bg-white *:text-stone-700 hover:bg-stone-200'>
      <div className='flex items-center justify-between'>
        {isCurrentUser ? (
          <span className='text-lg font-bold'>{user.username}</span>
        ) : (
          <Link
            href={`/users/${user.username}`}
            className='text-lg font-bold hover:text-[#3b82f6] transition-colors'
          >
            {user.username}
          </Link>
        )}
        <span className='text-sm text-stone-400'>
          {formatToTimeAgo(created_at.toString())}
        </span>
      </div>
      <Link href={`/tweets/${id}`} className='text-lg'>
        {tweet.slice(0, 20)}...
      </Link>
    </div>
  );
}
