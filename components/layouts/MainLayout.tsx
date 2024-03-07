'use client';

import React from 'react';

import { SessionProvider } from 'next-auth/react';

import { BackButton } from '@/components/controls/NavButtons';
import Sidebar from '@/components/sidebar/Sidebar';
import EntitySearch from '@/components/entities/EntitySearch';

export default function MainLayout({ children }: { children: any }) {
  return (
    <SessionProvider>
      <header className="flex flex-row bg-slate-50  shadow-sm h-14 justify-center items-center">
        <div className="w-1/2">
          <EntitySearch />
        </div>
      </header>
      <div className="flex flex-row ">
        <Sidebar />

        <main className="container  mx-auto p-4 min-h-screen">
          <div className="min-h-4" />
          <BackButton />
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
