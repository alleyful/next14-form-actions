import Button from "@/components/Button";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();

  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });

    if (user) {
      return user;
    }
  }

  notFound();
}

export default async function Profile() {
  const user = await getUser();

  const logOut = async () => {
    "use server";

    const session = await getSession();
    await session.destroy();

    redirect("/login");
  };

  return (
    <div className="flex flex-col px-4 py-6 gap-4 max-w-2xl m-auto">
      <div className="flex flex-col gap-2 p-4 bg-slate-800 rounded-md">
        <h1 className="text-xl font-bold text-pink-400">{user.username}</h1>

        <p>{user.email}</p>

        {user.bio && <p>{user.bio}</p>}
      </div>

      <form action={logOut}>
        <Button text="Logout" />
      </form>
    </div>
  );
}
