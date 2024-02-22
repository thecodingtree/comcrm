'use client';

import { useSession } from 'next-auth/react';

import { trpc } from '@/app/_trpc/client';

import SettingCard from '@/components/common/SettingCard';

import EditAvatar from '@/components/input/EditAvatar';
import { toast } from 'sonner';

export default function UpdateAvatar() {
  const { update } = useSession();
  const { data, isLoading, refetch } = trpc.me.getMe.useQuery();

  const updateMe = trpc.me.updateMe.useMutation();

  const handleAvatarUpdate = (value?: string) => {
    if (!value) {
      return;
    }

    updateMe.mutate(
      { image: value },
      {
        onSuccess: () => {
          toast.success('Avatar updated');

          // Update the session to reflect the new avatar
          update();
          refetch();
        },
      },
    );
  };

  return (
    <SettingCard title="Avatar">
      <EditAvatar src={data?.image || ''} onUpdated={handleAvatarUpdate} />
    </SettingCard>
  );
}
