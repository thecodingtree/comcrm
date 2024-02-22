'use client';

import { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { useSession, signOut } from 'next-auth/react';

import { trpc } from '@/app/_trpc/client';

import { toast } from 'sonner';

export default function useUser() {
  const { data, status, update } = useSession();
  const updateMe = trpc.me.updateMe.useMutation();

  const updateUser = ({ name, image }: { name?: string; image?: string }) => {
    updateMe.mutate(
      { name, image },
      {
        onSuccess: () => {
          update({ name, image });
          toast.success('Profile updated');
        },
      },
    );
    //update({ name, image });
  };

  const user = data?.user;

  return { user, signOut, updateUser };
}
