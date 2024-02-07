import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { IconChevronRight, IconLogout } from '@tabler/icons-react';

import useUser from '@/hooks/useUser';

export function AccountMenuItem() {
  const { user, signOut } = useUser();

  return (
    <div className="font-medium text-sm">
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
  );
}
