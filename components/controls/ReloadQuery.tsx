import { ActionIcon } from '@mantine/core';
import { IconReload } from '@tabler/icons-react';

interface ReloadQueryProps {
  reload: () => void;
}

export default function ReloadQuery({ reload }: ReloadQueryProps) {
  return (
    <div>
      <ActionIcon
        onClick={() => reload()}
        variant="default"
        aria-label="Settings"
      >
        <IconReload style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </div>
  );
}
