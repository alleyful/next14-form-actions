"use client";

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

export default function Button({
  text,
  ...rest
}: { text: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full h-12 rounded-3xl py-2 font-medium text-white cursor-pointer
        bg-gradient-to-r from-[var(--tt-gradient-start)] via-[var(--tt-gradient-middle)] to-[var(--tt-gradient-end)]
        hover:opacity-90 transition-all
        disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pending}
      {...rest}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
