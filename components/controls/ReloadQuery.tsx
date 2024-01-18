import { IconReload } from '@tabler/icons-react';

import { IconButton } from './Buttons';

interface ReloadQueryProps {
  reload: () => void;
}

export default function ReloadQuery({ reload }: ReloadQueryProps) {
  return (
    <div>
      <IconButton
        onClick={() => reload()}
        icon={
          <IconReload style={{ width: '70%', height: '70%' }} stroke={1.5} />
        }
      />
    </div>
  );
}
