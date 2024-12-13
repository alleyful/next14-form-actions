'use client';

import { useOptimistic, useState } from 'react';
import { useFormState } from 'react-dom';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { addTweetResponse, InitialResponses } from '@/service/responseService';
import Input from './Input';
import { responseSchema } from '@/lib/scehma';

export default function Responses({
  initialResponses,
  tweetId,
  username
}: {
  initialResponses: InitialResponses;
  tweetId: number;
  username: string;
}) {
  const params = useParams();

  const [responses, optimisticResponse] = useOptimistic(
    initialResponses,
    (previousResponses, responseOptimisticValue: string) => {
      return [
        ...previousResponses,
        {
          id: new Date().getDate(),
          text: responseOptimisticValue,
          created_at: new Date(),
          tweetId,
          user: { username, id: Infinity }
        }
      ];
    }
  );

  const handleUploadResponse = (_: unknown, formData: FormData) => {
    const result = responseSchema.safeParse(formData.get('text'));
    if (result.success) {
      optimisticResponse(result.data);
      addTweetResponse(formData);
      setText('');
    } else {
      return result.error.flatten();
    }
  };

  const [text, setText] = useState('');

  const [state, action] = useFormState(handleUploadResponse, null);

  return (
    <div className='w-full flex flex-col gap-3'>
      <form action={action} className='flex w-full gap-2 '>
        <Input
          labelIcon={<ChatBubbleBottomCenterTextIcon />}
          name='text'
          type='text'
          required
          placeholder='Write a response.'
          value={text}
          onChange={e => setText(e.target.value)}
          errors={state?.fieldErrors[0]}
        />
        <input
          className='hidden'
          type='hidden'
          name='tweetId'
          value={tweetId}
        />
        <button className='ml-auto min-w-14 bg-stone-300 rounded-xl p-3'>
          추가
        </button>
      </form>
      {responses.map(response => (
        <div key={response.id} className='*:text-md flex items-center my-3'>
          {params.username === response.user.username ? (
            <span className='font-semibold w-3/12'>
              {response.user.username}
            </span>
          ) : (
            <Link
              href={`/users/${response.user.username}`}
              className='font-semibold w-3/12 hover:text-[#3b82f6] transition-colors'
            >
              {response.user.username}
            </Link>
          )}
          <span> {response.text}</span>
        </div>
      ))}
    </div>
  );
}