import React from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import GNB from '@/components/common/GNB';
import '@/styles/globals.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920'
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <GNB />
        {children}
        <p>footer</p>
      </body>
    </html>
  );
}
