import Link from 'next/link';

export interface Tweet {
  id: number;
  tweet: string;
  created_at: Date;
  user: {
    username: string;
  };
}

export default function TweetItem({ tweet }: { tweet: Tweet }) {
  return (
    <Link href={`/tweets/${tweet.id}`}>
      <div className='flex flex-col gap-2 p-4 bg-gray-100 hover:bg-gray-200 rounded-2xl'>
        <p className='text-lg font-bold text-blue-500'>{tweet.user.username}</p>
        <p className='text-gray-500'>{tweet.tweet}</p>
      </div>
    </Link>
  );
}
