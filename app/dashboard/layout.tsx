import { Space } from '@mantine/core';
import { BackButton } from '@/components/controls/NavButtons';

export default function MainLayout({ children }: { children: any }) {
  return (
    <div>
      <Space h="lg" />
      <BackButton />
      {children}
    </div>
  );
}
