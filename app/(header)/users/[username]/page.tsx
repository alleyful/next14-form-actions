import { notFound } from 'next/navigation';
import { getUserByUsername } from '@/service/userService';
import { getTweetsByUserId } from '@/service/tweetService';
import { getSession } from '@/lib/session';
import TweetItem from '@/components/TweetItem';
import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/outline';

export default async function UserProfile({
  params: { username }
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(username);
  if (!user) notFound();

  const tweets = await getTweetsByUserId(user.id);
  const session = await getSession();
  const isOwner = session.id === user.id;

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <div className='bg-white rounded-xl p-6 mb-6 relative'>
        <div className='flex items-start justify-between'>
          <div>
            <h1 className='text-2xl font-bold'>{user.username}</h1>
            <p className='text-gray-600'>{user.email}</p>
            {user.bio && <p className='mt-2'>{user.bio}</p>}
          </div>
          {isOwner && (
            <Link
              href={`/users/${username}/edit`}
              className='flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900'
            >
              <PencilIcon className='w-4 h-4' />
              프로필 수정
            </Link>
          )}
        </div>
      </div>

      <div className='space-y-4'>
        {tweets.map(tweet => (
          <TweetItem key={tweet.id} {...tweet} />
        ))}
      </div>
    </div>
  );
}
