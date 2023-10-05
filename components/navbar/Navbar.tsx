import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
  IconAddressBook,
  IconTopologyStar3,
  IconBuilding,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';

import { AccountMenu } from '@/components/account/AccountMenu';

const data = [
  { link: 'contacts', label: 'Contacts', icon: IconAddressBook },
  { link: 'companies', label: 'Companies', icon: IconTopologyStar3 },
  { link: 'properties', label: 'Properties', icon: IconBuilding },
];

export default function Navbar() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
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
