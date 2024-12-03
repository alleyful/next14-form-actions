import db from '@/lib/db';
import TweetList from '@/components/TweetList';

const getTweets = async () => {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: {
        select: {
          username: true
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  return tweets;
};

export default async function Home() {
  const tweets = await getTweets();

  return (
    <div className='flex flex-col items-center justify-between min-h-screen p-4'>
      <TweetList tweets={tweets} />
    </div>
  );
}
