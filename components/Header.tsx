// components/Header.tsx
"use client";

import { useRouter } from "next/navigation";
import { TweetTalkLogo } from "./TweetTalkLogo";
import { useState } from "react";
import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "./common/Button";

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900 px-4 py-2">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="w-auto">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <TweetTalkLogo />
          </Link>
        </div>

        <div>
          <Link href="/search">
            <Button variant="ghost" size="icon">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <UserIcon className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
