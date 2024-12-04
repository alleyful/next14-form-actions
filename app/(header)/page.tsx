import db from '@/lib/db';
import TweetList from '@/components/TweetList';
import { getInitialTweets } from '@/service/tweetService';
import AddTweet from '@/components/AddTweet';

export default async function Home() {
  const tweets = await getInitialTweets();

  return (
    <div className='flex flex-col min-h-screen py-4 gap-6'>
      <AddTweet />
      <TweetList initialTweets={tweets} />
    </div>
  );
}
