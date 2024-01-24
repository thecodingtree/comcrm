'use client';

import React from 'react';

import Navbar from '@/components/navbar/Navbar';
import { SessionProvider } from 'next-auth/react';

export default function DashboardLayout({ children }: { children: any }) {
  return (
    <SessionProvider>
      <div className="flex flex-row">
        <Navbar />
        <main className="container mx-auto p-4 min-h-screen">{children}</main>
      </div>
    </SessionProvider>
  );
}
