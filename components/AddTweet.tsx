'use client';

import { useFormState } from 'react-dom';
import Button from './Button';
import { createTweet } from '@/service/tweetService';

export default function AddTweet() {
  const [state, action] = useFormState(createTweet, null);

  return (
    <form action={action}>
      <div className='flex flex-col gap-2'>
        <textarea
          name='tweet'
          placeholder='내용을 입력하세요.'
          className={`w-full p-4 rounded-lg resize-none text-stone-600 border placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-offset-2 transition ${
            state?.error?.tweet
              ? 'border-red-500 focus:ring-red-400'
              : 'border-stone-400 focus:ring-stone-300'
          }`}
        />

        <Button text={'트윗하기'} />
      </div>
    </form>
  );
}
