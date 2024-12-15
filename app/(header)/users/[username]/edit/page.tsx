import { notFound, redirect } from 'next/navigation';
import { getUserByUsername } from '@/service/userService';
import { getSession } from '@/lib/session';
import EditProfileForm from './EditProfileForm';

export default async function EditProfile({
  params: { username }
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(username);
  if (!user) notFound();

  const session = await getSession();
  if (session.id !== user.id) {
    redirect(`/users/${username}`);
  }

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>프로필 수정</h1>
      <EditProfileForm user={user} />
    </div>
  );
}
