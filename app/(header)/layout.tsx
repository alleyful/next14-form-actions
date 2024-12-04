import Header from '@/components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className='flex flex-col'>
      <Header />
      {children}
    </section>
  );
}
