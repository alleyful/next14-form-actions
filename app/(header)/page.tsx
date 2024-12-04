import db from '@/lib/db';
import TweetList from '@/components/TweetList';
import { getInitialTweets } from '@/service/tweetService';

export default async function Home() {
  const tweets = await getInitialTweets();

  return (
    <div className='flex flex-col min-h-screen p-4'>
      <TweetList initialTweets={tweets} />
    </div>
  );
}
