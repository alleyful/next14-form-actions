'use server';

import { Prisma } from '@prisma/client';
import { z } from 'zod';

import db from '@/lib/db';
import { LIMIT_OFFSET_NUMBER } from '@/lib/constants';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';

export const getInitialTweets = async () => {
  const tweets = db.tweet.findMany({
    include: { user: true },
    take: LIMIT_OFFSET_NUMBER,
    orderBy: {
      created_at: 'desc'
    }
  });
  return tweets;
};
export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export async function getTweetsByPage(page: number) {
  const tweets = await db.tweet.findMany({
    include: { user: true },
    skip: LIMIT_OFFSET_NUMBER * (page - 1),
    take: LIMIT_OFFSET_NUMBER,
    orderBy: {
      created_at: 'desc'
    }
  });
  return tweets;
}
export async function getTweetTotalCount() {
  return db.tweet.count();
}
export async function getPaginatedTweets(page: number) {
  const tweets = await getTweetsByPage(page);
  const TWEETS_TOTAL_COUNT = await getTweetTotalCount();
  const isLastPage = TWEETS_TOTAL_COUNT <= LIMIT_OFFSET_NUMBER * page;
  return { tweets, isLastPage };
}

const tweetSchema = z.object({
  tweet: z.string().min(1, { message: 'Tweet is required.' })
});

export async function createTweet(_: unknown, formData: FormData) {
  const tweet = formData.get('tweet');

  const result = tweetSchema.safeParse({ tweet });
  if (!result.success) {
    return {
      error: result.error.flatten().fieldErrors,
      isSuccess: false
    };
  }

  const session = await getSession();
  if (session.id) {
    const tweet = await db.tweet.create({
      data: {
        tweet: result.data.tweet,
        user: {
          connect: {
            id: session.id
          }
        }
      }
    });

    redirect(`/tweets/${tweet.id}`);
  }
}

export const getTweetById = async (id: number) => {
  const tweet = await db.tweet.findUnique({
    where: {
      id
    },
    include: {
      user: {
        select: {
          username: true
        }
      }
    }
  });

  return tweet;
};

export async function searchTweets(query: string) {
  if (!query) return [];

  return db.tweet.findMany({
    where: {
      tweet: {
        contains: query
      }
    },
    include: {
      user: true
    },
    orderBy: {
      created_at: 'desc'
    }
  });
}

export async function getTweetsByUserId(userId: number) {
  return db.tweet.findMany({
    where: {
      userId
    },
    include: {
      user: true
    },
    orderBy: {
      created_at: 'desc'
    }
  });
}
