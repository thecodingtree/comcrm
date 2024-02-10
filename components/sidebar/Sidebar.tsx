'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@/libs/utils';

import { AccountMenuItem } from '@/components/account/AccountMenuItem';

import {
  IconDashboard,
  IconCompany,
  IconContact,
  IconProperty,
  IconTeam,
} from '@/components/common/icons';

const sidebarData = [
  { link: '/dashboard', label: 'Dashboard', icon: IconDashboard },
  { link: '/contacts', label: 'Contacts', icon: IconContact },
  { link: '/companies', label: 'Companies', icon: IconCompany },
  { link: '/properties', label: 'Properties', icon: IconProperty },
  { link: '/team', label: 'Team', icon: IconTeam },
];

const getActiveFromPath = (path: string) => {
  return sidebarData.find((item) => path.includes(item.link))?.label;
};

export default function Sidebar() {
  const pathName = usePathname();

  const links = sidebarData.map((item) => {
    const isActive = pathName?.includes(item.link);

    return (
      <Link
        className={cn(
          'w-full flex items-center gap-2 p-4 text-sm font-medium text-slate-900 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors duration-200 ease-in-out',
          `${isActive ? 'bg-slate-200 hover:bg-slate-200' : null}`,
        )}
        data-active={isActive || undefined}
        href={item.link}
        key={item.label}
      >
        <item.icon size={24} stroke={1.5} />
        <span>{item.label}</span>
      </Link>
    );
  });

  return (
    <aside className="h-screen bg-slate-50">
      <nav className="">
        <div className="flex flex-col overflow-hidden justify-between items-start p-4 text-sm font-medium w-64 min-h-screen">
          <div className="w-full">{links}</div>
          <div className="w-full h-full">
            <AccountMenuItem />
          </div>
        </div>
      </nav>
    </aside>
  );
}
