import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TweetTalk',
  description: 'A simple Twitter clone'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <main className='mx-auto max-w-6xl px-4'>{children}</main>
      </body>
    </html>
  );
}
