'use client';

import { useState } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import classes from './Navbar.module.css';

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
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <AccountMenu />
      </div>
    </nav>
  );
}
