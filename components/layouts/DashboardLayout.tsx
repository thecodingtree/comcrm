'use client';

import React from 'react';

import { Container } from '@mantine/core';
import Navbar from '@/components/navbar/Navbar';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger } from '@mantine/core';
import { SessionProvider } from 'next-auth/react';

export default function DashboardLayout({ children }: { children: any }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <SessionProvider>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>Logo</div>
        </AppShell.Header>

        <AppShell.Navbar>
          <Navbar />
        </AppShell.Navbar>

        <AppShell.Main>
          <Container fluid>{children}</Container>
        </AppShell.Main>
      </AppShell>
    </SessionProvider>
  );
}
