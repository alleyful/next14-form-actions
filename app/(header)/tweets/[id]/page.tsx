import Input from '@/components/Input';
import db from '@/lib/db';
import { notFound } from 'next/navigation';

const getTweet = async (id: number) => {
  const tweet = await db.tweet.findUnique({
    where: {
      id
    },
    include: {
      user: {
        select: {
          username: true
        }
      }
    }
  });

  return tweet;
};

export default async function TweetPage({
  params
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) notFound();

  const tweet = await getTweet(id);
  if (!tweet) notFound();

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='pb-36'>
        <h3 className='p-5 flex items-center gap-3 border-b border-neutral-500'>
          {tweet.user.username}
        </h3>
        <p className='p-5'>{tweet.tweet}</p>
      </div>
      <Input name='retweet' placeholder='Tweet something...' />
    </div>
  );
}
