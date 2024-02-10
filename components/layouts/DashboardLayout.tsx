'use client';

import React, { useEffect } from 'react';

import { toast } from 'sonner';

import { SessionProvider } from 'next-auth/react';

import { BackButton } from '@/components/controls/NavButtons';
import Sidebar from '@/components/sidebar/Sidebar';

export default function DashboardLayout({ children }: { children: any }) {
  return (
    <SessionProvider>
      <div className="flex flex-row">
        <Sidebar />
        <main className="container mx-auto p-4 min-h-screen">
          <div className="min-h-4" />
          <BackButton />
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
