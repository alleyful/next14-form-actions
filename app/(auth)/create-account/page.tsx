"use client";

import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/24/solid";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import SuccessMessage from "@/components/success-message";
import { TweetTalkLogo } from "@/components/TweetTalkLogo";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);

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
          name="username"
          placeholder="Username"
          required={true}
          errors={state?.error?.fieldErrors.username}
          labelIcon={<UserIcon />}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required={true}
          errors={state?.error?.fieldErrors.password}
          labelIcon={<KeyIcon />}
        />
        <Button text="Create Account" />
        {state?.isSuccess && <SuccessMessage />}
      </form>
      <div className="flex gap-2">
        <span>이미 계정이 있나요?</span>
        <Link
          href="/log-in"
          className="text-pink-400 hover:underline hover:text-stone-400"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
