import Input from '@/components/Input';
import TweetItem from '@/components/TweetItem';
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
    <div className='flex flex-col gap-4 min-h-screen p-4'>
      <TweetItem tweet={tweet} />
      <Input name='retweet' placeholder='Tweet something...' />
    </div>
  );
}
