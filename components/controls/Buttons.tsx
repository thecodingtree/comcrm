import { useRouter } from 'next/navigation';
import { ActionIcon } from '@mantine/core';
import {
  IconPencil,
  IconX,
  IconCheck,
  IconArrowNarrowLeft,
} from '@tabler/icons-react';

export function EditButton({ onClick }: { onClick?: () => void }) {
  return (
    <ActionIcon variant="transparent" color="gray" onClick={onClick}>
      <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
}

export function DeleteButton({ onClick }: { onClick?: () => void }) {
  return (
    <ActionIcon variant="transparent" color="gray" onClick={onClick}>
      <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
}

export function ConfirmButton({ onClick }: { onClick?: () => void }) {
  return (
    <ActionIcon variant="transparent" color="gray" onClick={onClick}>
      <IconCheck style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
}
