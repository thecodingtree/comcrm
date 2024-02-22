import { useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  IconChevronRight,
  IconLogout,
  IconUserEdit,
} from '@tabler/icons-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import useUser from '@/hooks/useUser';

import { AccountSkeleton } from '@/components/account/AccountSkeleton';

export function AccountMenuItem() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useUser();

  return (
    <Popover open={open} onOpenChange={(open) => setOpen(open)}>
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
      <PopoverContent side="right">
        <div className="flex flex-col">
          <div className="p-2">
            <Link
              href="/profile"
              className="w-full flex flex-row gap-2 items-center"
              onClick={(_) => setOpen(false)}
            >
              <IconUserEdit size={24} />
              <div className="">Profile</div>
            </Link>
          </div>
          <div className="p-2">
            <Link
              href="#"
              className="w-full flex flex-row gap-2 items-center"
              onClick={(_) => signOut()}
            >
              <IconLogout size={24} />
              <div className="">Logout</div>
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
