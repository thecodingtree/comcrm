import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { IconChevronRight, IconLogout } from '@tabler/icons-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import useUser from '@/hooks/useUser';

import { IconButton } from '@/components/controls/Buttons';
import { AccountSkeleton } from '@/components/account/AccountSkeleton';

export function AccountMenuItem() {
  const { user, signOut } = useUser();

  return (
    <Popover>
      <PopoverTrigger>
        <div className="font-medium text-sm grid grid-flow-col gap-2 justify-start overflow-hidden">
          {user ? (
            <Avatar>
              <AvatarImage src={user?.image ?? undefined} />
              <AvatarFallback>{`${user?.name?.charAt(0) ?? ''}`}</AvatarFallback>
            </Avatar>
          ) : (
            <AccountSkeleton />
          )}

          <div className="overflow-hidden text-ellipsis">
            <p className="text-sm font-bold text-start">{user?.name}</p>

            <p className="text-xs text-slate-400 text-start text-ellipsis overflow-hidden">
              {user?.email}
            </p>
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
