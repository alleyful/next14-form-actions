import Input from '@/components/Input';
import { getTweetById } from '@/service/tweetService';
import { notFound } from 'next/navigation';

export default async function TweetPage({
  params
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) notFound();

  const tweet = await getTweetById(id);
  if (!tweet) notFound();

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='mb-2 bg-white rounded-lg p-6'>
        <h3 className='flex items-center gap-3 border-neutral-500 text-gray-500 pb-2'>
          {tweet.user.username}
        </h3>

        <p className=''>{tweet.tweet}</p>
      </div>

      <Input name='retweet' placeholder='답글 작성' />
    </div>
  );
}
