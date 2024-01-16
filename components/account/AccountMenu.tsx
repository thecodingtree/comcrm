import {
  UnstyledButton,
  Group,
  Avatar,
  rem,
  Menu,
  useMantineTheme,
} from '@mantine/core';
import { IconChevronRight, IconLogout } from '@tabler/icons-react';

import useUser from '@/hooks/useUser';

import classes from './AccountMenu.module.css';

export function AccountMenu() {
  const theme = useMantineTheme();
  const { user, signOut } = useUser();

  return (
    <Menu
      transitionProps={{ transition: 'pop-top-right' }}
      position="top-end"
      width={220}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar src={user?.image} radius="xl" />

            <div style={{ flex: 1 }}>
              <p className="text-sm font-bold">{user?.name}</p>

              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>

            <IconChevronRight
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconLogout
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
              stroke={1.5}
            />
          }
          onClick={() => signOut()}
        >
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
