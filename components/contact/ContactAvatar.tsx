import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

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
  return (
    <div className="flex flex-col items-start">
      <Avatar className="min-w-40 min-h-40">
        <AvatarImage src={avatarSrc} />
        <AvatarFallback>
          <IconContact size={64} />
        </AvatarFallback>
      </Avatar>
      <Popover>
        <PopoverTrigger>
          <IconPencil style={{ width: '100%', height: '70%' }} stroke={1.5} />
        </PopoverTrigger>
        <PopoverContent>
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
        </PopoverContent>
      </Popover>
    </div>
  );
}
