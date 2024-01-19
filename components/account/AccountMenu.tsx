import { Menu, useMantineTheme } from '@mantine/core';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { IconChevronRight, IconLogout } from '@tabler/icons-react';

import useUser from '@/hooks/useUser';

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
        <div className="flex flex-row gap-2 cursor-pointer">
          <Avatar>
            <AvatarImage src={user?.image} />
            <AvatarFallback>{`${user?.name[0]}`}</AvatarFallback>
          </Avatar>

          <div style={{ flex: 1 }}>
            <p className="text-sm font-bold">{user?.name}</p>

            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>

          <IconChevronRight size={24} stroke={1.5} />
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconLogout size={24} color={theme.colors.blue[6]} stroke={1.5} />
          }
          onClick={() => signOut()}
        >
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
