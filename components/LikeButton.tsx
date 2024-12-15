"use client";

import { useOptimistic } from "react";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";

import { dislikeTweet, likeTweet } from "@/service/likeService";

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}) {
  const [state, reducer] = useOptimistic(
    { likeCount, isLiked },
    (previousState) => ({
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
      isLiked: !previousState.isLiked,
    })
  );
  const handleLikeButton = () => {
    reducer(null);
    if (isLiked) {
      dislikeTweet(tweetId);
    } else {
      likeTweet(tweetId);
    }
  };
  return (
    <form action={handleLikeButton} className="flex justify-end">
      <button
        className={`flex items-center gap-2 text-sm text-white rounded-full p-2  transition-colors  ${
          state.isLiked
            ? "bg-gradient-to-r from-[var(--tt-gradient-start)] via-[var(--tt-gradient-middle)] to-[var(--tt-gradient-end)]"
            : "hover:bg-stone-300"
        }`}
      >
        {state.isLiked ? (
          <HandThumbUpIcon className="size-5" />
        ) : (
          <OutlineHandThumbUpIcon className="size-5" />
        )}

        <span> {state.likeCount}</span>
      </button>
    </form>
  );
}
