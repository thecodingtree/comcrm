import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { IconChevronRight, IconLogout } from '@tabler/icons-react';

import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

import useUser from '@/hooks/useUser';

export function AccountMenu() {
  const { user, signOut } = useUser();

  return (
    <NavigationMenuItem className="absolute bottom-0">
      <NavigationMenuTrigger>
        {' '}
        <div className="flex flex-row gap-2 cursor-pointer">
          <Avatar>
            <AvatarImage src={user?.image} />
            <AvatarFallback>{`${user?.name?.charAt(0) ?? ''}`}</AvatarFallback>
          </Avatar>

          <div style={{ flex: 1 }}>
            <p className="text-sm font-bold">{user?.name}</p>

            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>

          <IconChevronRight size={24} stroke={1.5} />
        </div>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink onClick={() => signOut()}>
          Signout
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
