import TweetItem, { Tweet } from './TweetItem';

export default function TweetList({ tweets }: { tweets: Tweet[] }) {
  return (
    <div className='flex flex-col gap-4 w-full'>
      {tweets.length > 0 ? (
        tweets.map(tweet => <TweetItem key={tweet.id} tweet={tweet} />)
      ) : (
        <div>No tweets found</div>
      )}
    </div>
  );
}
