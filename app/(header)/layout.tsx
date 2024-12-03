import Header from '@/components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className='flex flex-col pt-[64px] '>
      <Header />
      {children}
    </section>
  );
}
