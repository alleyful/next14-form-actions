import { Suspense } from "react";
import { searchTweets } from "@/service/tweetService";
import SearchBar from "@/components/SearchBar";
import TweetItem from "@/components/TweetItem";

interface SearchPageProps {
  searchParams: { q?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  // 비동기 함수를 직접 호출하지 않고 별도의 컴포넌트로 분리
  return (
    <div className="space-y-6 py-6 px-4 max-w-2xl m-auto">
      <SearchBar />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults query={searchParams.q} />
      </Suspense>
    </div>
  );
}

// 비동기 데이터 fetching을 위한 별도의 컴포넌트
async function SearchResults({ query }: { query?: string }) {
  const tweets = await searchTweets(query || "");

  if (tweets.length === 0 && query) {
    return (
      <p className="text-center text-gray-500 py-10">검색 결과가 없습니다.</p>
    );
  }

  return (
    <div className="space-y-4 max-w-2xl m-auto">
      {tweets.map((tweet) => (
        <TweetItem key={tweet.id} {...tweet} />
      ))}
    </div>
  );
}
