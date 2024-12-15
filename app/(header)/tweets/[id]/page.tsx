import LikeButton from "@/components/LikeButton";
import Responses from "@/components/Responses";
import TweetItem from "@/components/TweetItem";
import { getSession } from "@/lib/session";
import { getLikeStatus } from "@/service/likeService";
import { getInitialResponse } from "@/service/responseService";
import { getTweetById } from "@/service/tweetService";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const cachedLikeStatus = unstable_cache(
    getLikeStatus,
    ["tweet-like-status"],
    {
      tags: [`like-status-${tweetId}`],
    }
  );
  return cachedLikeStatus(tweetId, session.id!);
}

async function getCachedResponses(tweetId: number) {
  const cachedResponses = unstable_cache(
    getInitialResponse,
    ["tweet-responses"],
    {
      tags: [`tweet-responses-${tweetId}`],
    }
  );
  return cachedResponses(tweetId);
}

export default async function TweetPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) notFound();

  const tweet = await getTweetById(id);
  const responses = await getCachedResponses(id);
  if (!tweet) notFound();
  const { isLiked, likeCount } = await getCachedLikeStatus(id);

  console.log(tweet);

  return (
    <div className="flex flex-col gap-2 p-4 max-w-2xl m-auto">
      <TweetItem
        id={tweet.id}
        tweet={tweet.tweet}
        created_at={tweet.created_at}
        user={tweet.user}
      />

      <div className="flex flex-col gap-8">
        <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} />

        <Responses
          initialResponses={responses}
          tweetId={id}
          username={tweet.user.username}
        />
      </div>
    </div>
  );
}
