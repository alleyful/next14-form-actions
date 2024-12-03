import Button from '@/components/Button';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';

async function getUser() {
  const session = await getSession();

  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id
      }
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
    'use server';

    const session = await getSession();
    await session.destroy();

    redirect('/login');
  };

  return (
    <div className='flex flex-col min-h-screen px-4 py-6 gap-4'>
      <div className='flex flex-col gap-2 p-4 bg-gray-100 rounded-md'>
        <h1 className='text-xl font-bold text-blue-500'>{user.username}</h1>

        <p>{user.email}</p>

        {user.bio && <p>{user.bio}</p>}
      </div>

      <form action={logOut}>
        <Button text='Logout' />
      </form>
    </div>
  );
}
