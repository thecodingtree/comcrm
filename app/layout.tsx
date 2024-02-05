import React from 'react';
import { headers } from 'next/headers';
import { Inter as FontSans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

import { TRPCProvider } from '@/app/_trpc/TRPCProvider';

import '@uploadthing/react/styles.css';

import '@/app/globals.css';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export const metadata = {
  title: 'COMCRM - The Modern CRM for Real Estate Agents',
  description: 'COMCRM - The Modern CRM for Real Estate Agents',
};

import { cn } from '@/libs/utils';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <TRPCProvider headers={headers()}>
          <Header />
          {children}
          <Footer />
        </TRPCProvider>
        <Analytics />
      </body>
    </html>
  );
}
