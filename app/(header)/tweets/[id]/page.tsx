import LikeButton from '@/components/LikeButton';
import Responses from '@/components/Responses';
import { getSession } from '@/lib/session';
import { getLikeStatus } from '@/service/likeService';
import { getInitialResponse } from '@/service/responseService';
import { getTweetById } from '@/service/tweetService';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const cachedLikeStatus = unstable_cache(
    getLikeStatus,
    ['tweet-like-status'],
    {
      tags: [`like-status-${tweetId}`]
    }
  );
  return cachedLikeStatus(tweetId, session.id!);
}

async function getCachedResponses(tweetId: number) {
  const cachedResponses = unstable_cache(
    getInitialResponse,
    ['tweet-responses'],
    {
      tags: [`tweet-responses-${tweetId}`]
    }
  );
  return cachedResponses(tweetId);
}

export default async function TweetPage({
  params
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) notFound();

  const tweet = await getTweetById(id);
  const responses = await getCachedResponses(id);
  if (!tweet) notFound();
  const { isLiked, likeCount } = await getCachedLikeStatus(id);

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='mb-2 bg-white rounded-lg p-6'>
        <h3 className='flex items-center gap-3 border-neutral-500 text-gray-500 pb-2'>
          {tweet.user.username}
        </h3>

        <p className=''>{tweet.tweet}</p>
      </div>

      <div className='flex flex-col gap-4'>
        <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} />
        <Responses
          initialResponses={responses}
          tweetId={id}
          username={tweet.user.username}
        />
      </div>
    </div>
  );
}
