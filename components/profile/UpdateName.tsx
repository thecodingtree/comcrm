'use client';

import useUser from '@/hooks/useUser';

import { trpc } from '@/app/_trpc/client';

import SettingCard from '@/components/common/SettingCard';

import EditText from '@/components/input/EditText';

export default function UpdateName() {
  const { updateUser } = useUser();
  const { data, isLoading, refetch } = trpc.me.getMe.useQuery();

  const handleNameUpdate = (value?: string) => {
    if (!value) {
      return;
    }

    updateUser({ name: value });
  };

  return (
    <SettingCard title="Name">
      {!isLoading && (
        <EditText
          className="flex flex-row"
          initValue={data?.name || ''}
          onChange={handleNameUpdate}
        />
      )}
    </SettingCard>
  );
}
