import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './Providers';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Do This',
  description: 'A simple to-do list app built with nextjs and firebase',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} lg:justify-center lg:items-center`}>
        <Providers>
          <header className="w-full">
            <Nav />
          </header>
          <main className="light">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
