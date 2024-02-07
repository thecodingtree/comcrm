'use client';

import { useState } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { AccountMenuItem } from '@/components/account/AccountMenuItem';

import {
  IconCompany,
  IconContact,
  IconProperty,
  IconTeam,
} from '@/components/common/icons';

const data = [
  { link: '/dashboard/contacts', label: 'Contacts', icon: IconContact },
  { link: '/dashboard/companies', label: 'Companies', icon: IconCompany },
  { link: '/dashboard/properties', label: 'Properties', icon: IconProperty },
  { link: '/dashboard/team', label: 'Team', icon: IconTeam },
];

export default function Sidebar() {
  const pathName = usePathname();

  const getActiveFromPath = (path: string) => {
    return data.find((item) => path.includes(item.link))?.label;
  };

  const [active, setActive] = useState(getActiveFromPath(pathName || ''));

  const links = data.map((item) => (
    <Link
      className="w-full flex items-center gap-2 p-4 text-sm font-medium text-slate-900 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors duration-200 ease-in-out"
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
    >
      <item.icon size={24} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <aside className="h-screen bg-slate-50">
      <nav className="grid items-start px-4 text-sm font-medium w-64 min-h-screen">
        <div className="align-top">{links}</div>
        <div className="align-bottom">
          <AccountMenuItem />
        </div>
      </nav>
    </aside>
  );
}
