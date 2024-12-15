"use client";

import { useFormState } from "react-dom";
import { updateProfile } from "./actions";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { User } from "@prisma/client";

export default function EditProfileForm({ user }: { user: Partial<User> }) {
  const [state, action] = useFormState(updateProfile, null);

  return (
    <form action={action} className="space-y-4">
      <div className="flex flex-col gap-4 p-4  rounded-2xl">
        <Input
          name="username"
          placeholder="사용자 이름"
          defaultValue={user.username}
          errors={state?.error?.fieldErrors?.username}
        />
        <Input
          name="email"
          type="email"
          placeholder="이메일"
          defaultValue={user.email}
          errors={state?.error?.fieldErrors?.email}
        />
        <textarea
          name="bio"
          placeholder="자기소개"
          defaultValue={user.bio ?? ""}
          className="w-full py-4 px-6 min-h-24 border rounded-2xl focus:outline-none bg-slate-800 border-none"
        />
      </div>

      <h2 className="text-lg font-semibold mb-4 text-center">비밀번호 변경</h2>

      <div className="flex flex-col gap-4 pt-4 rounded-2xl p-4">
        <Input
          name="currentPassword"
          type="password"
          placeholder="현재 비밀번호"
          errors={state?.error?.fieldErrors?.currentPassword}
        />
        <Input
          name="newPassword"
          type="password"
          placeholder="새 비밀번호"
          errors={state?.error?.fieldErrors?.newPassword}
        />
      </div>
      <Button text="저장하기" />
    </form>
  );
}
