'use client';

import { useRouter } from 'next/navigation';

import { ActionIcon } from '@mantine/core';

import { Text } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';

export default function BackButton() {
  const router = useRouter();
  return (
    <ActionIcon
      onClick={() => router.back()}
      variant="transparent"
      color="gray"
      aria-label="Back"
    >
      <IconArrowNarrowLeft />
    </ActionIcon>
  );
}
