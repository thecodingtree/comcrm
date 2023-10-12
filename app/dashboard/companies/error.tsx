'use client';

import { Text } from '@mantine/core';

export default function Error({ error }: { error: any }) {
  return (
    <div>
      <Text>{'Error!'}</Text>
      <Text>{error}</Text>
    </div>
  );
}
