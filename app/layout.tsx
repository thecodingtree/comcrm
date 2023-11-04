import '@mantine/core/styles.css';
import React from 'react';
import { headers } from 'next/headers';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

import { TRPCProvider } from '@/app/_trpc/TRPCProvider';

import '@mantine/core/styles.css';

import { theme } from '../theme';

import DashboardLayout from '@/components/layouts/DashboardLayout';

export const metadata = {
  title: 'COMCRM - The Modern CRM for Real Estate Agents',
  description: 'COMCRM - The Modern CRM for Real Estate Agents',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <TRPCProvider headers={headers()}>
            <DashboardLayout>{children}</DashboardLayout>
          </TRPCProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
