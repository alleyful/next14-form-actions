"use client";

import Link from "next/link";
import { formatToTimeAgo } from "@/lib/utils";
import { User } from "@prisma/client";
import { useParams } from "next/navigation";

interface TweetItemProps {
  tweet: string;
  created_at: Date;
  id: number;
  user: Pick<User, "username">;
}

export default function TweetItem({
  tweet,
  created_at,
  id,
  user,
}: TweetItemProps) {
  const params = useParams();
  const isCurrentUser = params.username === user.username;

  return (
    <div className="flex flex-col px-6 py-4 gap-2 rounded-2xl bg-slate-800 *:text-stone-700 hover:bg-slate-700 cursor-pointer">
      <div className="flex items-center justify-between">
        {isCurrentUser ? (
          <span className="text-lg font-bold text-cyan-500">
            {user.username}
          </span>
        ) : (
          <Link
            href={`/users/${user.username}`}
            className="text-lg font-bold hover:text-pink-500 transition-colors"
          >
            {user.username}
          </Link>
        )}

        <span className="text-sm text-gray-300">
          {formatToTimeAgo(created_at.toString())}
        </span>
      </div>

      <Link href={`/tweets/${id}`}>
        <p className="text-lg text-gray-300">{tweet.slice(0, 20)}...</p>
      </Link>
    </div>
  );
}
