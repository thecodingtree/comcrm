'use client';

import useUser from '@/hooks/useUser';

import { trpc } from '@/app/_trpc/client';

import SettingCard from '@/components/common/SettingCard';

import EditAvatar from '@/components/input/EditAvatar';

export default function UpdateAvatar() {
  const { updateUser } = useUser();
  const { data, isLoading, refetch } = trpc.me.getMe.useQuery();

  const handleAvatarUpdate = (value?: string) => {
    if (!value) {
      return;
    }

    updateUser({ image: value, onSuccess: () => refetch() });
  };

  return (
    <SettingCard title="Avatar">
      <EditAvatar src={data?.image || ''} onUpdated={handleAvatarUpdate} />
    </SettingCard>
  );
}
