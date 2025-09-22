import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import MainHeader from '../components/main-header/main-header';
import type { ReactNode } from 'react';
import Nav from '@/components/Nav';
import './globals.css';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'B-Shop',
  description: 'Your one-stop shop for all your needs!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
