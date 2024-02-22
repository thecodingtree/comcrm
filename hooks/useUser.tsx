'use client';

import { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { useSession, signOut } from 'next-auth/react';

import { trpc } from '@/app/_trpc/client';

import { toast } from 'sonner';

export default function useUser() {
  const { data, status, update } = useSession();
  const updateMe = trpc.me.updateMe.useMutation();

  const updateUser = ({
    name,
    image,
    onSuccess,
  }: {
    name?: string;
    image?: string;
    onSuccess?: (user: Session['user']) => void;
  }) => {
    updateMe.mutate(
      { name, image },
      {
        onSuccess: () => {
          update();

          if (onSuccess) {
            onSuccess({ name, image });
          }

          toast.success('Profile updated');
        },
      },
    );
  };

  const user = data?.user;

  return { user, signOut, updateUser };
}
