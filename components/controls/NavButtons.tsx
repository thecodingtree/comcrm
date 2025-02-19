'use client';

import { useRouter } from 'next/navigation';

import { IconButton } from './Buttons';

import { IconArrowNarrowLeft } from '@tabler/icons-react';

export function BackButton() {
  const router = useRouter();
  return (
    <IconButton onClick={() => router.back()} icon={<IconArrowNarrowLeft />} />
  );
}
