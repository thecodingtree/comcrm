import { ActionIcon, Popover } from '@mantine/core';
import { useDisclosure, useClickOutside } from '@mantine/hooks';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { IconPencil } from '@tabler/icons-react';

import { UploadDropzone } from '@/utils/uploadthing';
import { IconContact } from '../common/icons';

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
    <div className="flex flex-col items-start">
      <Avatar className="min-w-40 min-h-40">
        <AvatarImage src={avatarSrc} />
        <AvatarFallback>
          <IconContact size={64} />
        </AvatarFallback>
      </Avatar>
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
    </div>
  );
}
