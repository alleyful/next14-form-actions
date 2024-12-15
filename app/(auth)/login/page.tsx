"use client";

import { useFormState } from "react-dom";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/solid";

import { handleForm } from "./actions";

import Input from "@/components/Input";
import Button from "@/components/Button";
import SuccessMessage from "@/components/success-message";
import Link from "next/link";
import { TweetTalkLogo } from "@/components/TweetTalkLogo";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <div className="flex flex-col p-4 gap-10 items-center justify-center max-w-2xl m-auto min-h-screen">
      <h1 className="text-center text-6xl">
        <TweetTalkLogo />
      </h1>

      <form action={action} className="w-full flex flex-col gap-5">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required={true}
          errors={state?.error?.fieldErrors.email}
          labelIcon={<EnvelopeIcon />}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required={true}
          errors={state?.error?.fieldErrors.password}
          labelIcon={<KeyIcon />}
        />
        <Button text="Log in" />
        {state?.isSuccess && <SuccessMessage />}
      </form>

      <div className="flex gap-2">
        <span>처음이신가요?</span>
        <Link
          href="/create-account"
          className="text-pink-400 hover:underline hover:text-stone-400"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
