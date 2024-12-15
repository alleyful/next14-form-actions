"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

const Input = ({
  name,
  placeholder,
  errors,
  labelIcon,
  ...rest
}: {
  name: string;
  placeholder: string;
  errors?: string[];
  labelIcon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-1">
      <div className="relative flex">
        <label
          htmlFor={name}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-300 *:size-5"
        >
          {labelIcon}
        </label>
        <input
          id={name}
          className={`w-full h-12 px-11 rounded-3xl bg-slate-800 text-gray-300 border placeholder:text-gray-400 focus:outline-none transition ${
            errors
              ? "border-red-500 focus:ring-red-400"
              : "border-slate-800 focus:ring-slate-800"
          }`}
          name={name}
          placeholder={placeholder}
          disabled={pending}
          {...rest}
        />
      </div>
      <div>
        {errors?.map((error) => (
          <p key={error} className="pt-2 pl-1 text-red-400">
            {error}
          </p>
        ))}
      </div>
    </div>
  );
};
export default Input;
