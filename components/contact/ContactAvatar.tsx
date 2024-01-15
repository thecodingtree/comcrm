import { Avatar, Stack, ActionIcon, Popover } from '@mantine/core';
import { useDisclosure, useClickOutside } from '@mantine/hooks';

import { IconPencil } from '@tabler/icons-react';

import { UploadDropzone } from '@/utils/uploadthing';

export default function ContactAvatar({
  avatarSrc,
  onUpdated,
}: {
  avatarSrc?: string;
  onUpdated?: (res: any) => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

  return (
    <Stack align="center">
      <Avatar color="blue" radius="xl" size={150} src={avatarSrc} />
      <Popover
        width={275}
        position="bottom"
        withArrow
        shadow="md"
        opened={opened}
        trapFocus
        closeOnClickOutside
      >
        <Popover.Target>
          <ActionIcon
            variant="filled"
            size="lg"
            aria-label="Change Avatar Image"
            onClick={open}
          >
            <IconPencil style={{ width: '100%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown ref={ref}>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              close();
              onUpdated && onUpdated(res);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
            onUploadBegin={(name) => {
              // Do something once upload begins
              console.log('Uploading: ', name);
            }}
            config={{ mode: 'manual' }}
          />
        </Popover.Dropdown>
      </Popover>
    </Stack>
  );
}
