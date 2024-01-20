'use client';

import { useState } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { AccountMenu } from '@/components/account/AccountMenu';

import {
  IconCompany,
  IconContact,
  IconProperty,
} from '@/components/common/icons';

const data = [
  { link: '/dashboard/contacts', label: 'Contacts', icon: IconContact },
  { link: '/dashboard/companies', label: 'Companies', icon: IconCompany },
  { link: '/dashboard/properties', label: 'Properties', icon: IconProperty },
];

export default function Navbar() {
  const pathName = usePathname();

  const getActiveFromPath = (path: string) => {
    return data.find((item) => path.includes(item.link))?.label;
  };

  const [active, setActive] = useState(getActiveFromPath(pathName || ''));

  const links = data.map((item) => (
    <NavigationMenuItem key={item.label}>
      <Link
        className=""
        data-active={item.label === active || undefined}
        href={item.link}
        key={item.label}
        onClick={() => {
          setActive(item.label);
        }}
        legacyBehavior
        passHref
      >
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          <item.icon size={24} stroke={1.5} />
          <span>{item.label}</span>
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  ));

  return (
    <aside className="w-64 h-screen bg-slate-50">
      <NavigationMenu
        orientation="vertical"
        className=" max-w-full h-full justify-start"
      >
        <NavigationMenuList className="top-0 flex-col w-full">
          {links}
        </NavigationMenuList>
        <AccountMenu />
      </NavigationMenu>
    </aside>
  );
}
