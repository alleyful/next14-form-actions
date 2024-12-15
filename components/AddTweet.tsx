"use client";

import { useFormState } from "react-dom";
import Button from "./Button";
import { createTweet } from "@/service/tweetService";

export default function AddTweet() {
  const [state, action] = useFormState(createTweet, null);

  return (
    <form
      action={action}
      className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-800 w-full"
    >
      <div className="flex flex-col gap-2">
        <textarea
          name="tweet"
          placeholder={
            state?.error?.tweet ? "내용은 필수입니다." : "내용을 입력하세요."
          }
          className={`w-full p-4 min-h-24 resize-none bg-slate-800 text-gray-200 focus:outline-none transition ${
            state?.error?.tweet
              ? "placeholder:text-red-400"
              : "placeholder:text-stone-400"
          }`}
        />

        <Button text={"트윗하기"} />
      </div>
    </form>
  );
}
