import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Do This',
  description: 'A simple to-do list app built with nextjs and firebase',
};

import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
};

const app = initializeApp(firebaseConfig);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} lg:justify-center lg:items-center`}>
        <header className="w-full">
          <Nav />
        </header>
        <main className="light">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
