import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { IconChevronRight, IconLogout } from '@tabler/icons-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import useUser from '@/hooks/useUser';

import { IconButton } from '@/components/controls/Buttons';

export function AccountMenuItem() {
  const { user, signOut } = useUser();

  return (
    <Popover>
      <PopoverTrigger>
        <div className="font-medium text-sm flex flex-row gap-2 justify-start">
          <Avatar>
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback>{`${user?.name?.charAt(0) ?? ''}`}</AvatarFallback>
          </Avatar>

          <div style={{ flex: 1 }}>
            <p className="text-sm font-bold text-start">{user?.name}</p>

            <p className="text-xs text-slate-400 text-start">{user?.email}</p>
          </div>

          <IconChevronRight size={24} stroke={1.5} />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <IconButton icon={<IconLogout size={24} />} onClick={signOut}>
          <div className="ml-4 text-sm">Logout</div>
        </IconButton>
      </PopoverContent>
    </Popover>
  );
}
