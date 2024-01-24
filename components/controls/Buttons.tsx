import { Button } from '@/components/ui/button';
import { IconPencil, IconX, IconCheck } from '@tabler/icons-react';

import { cn } from '@/lib/utils';

export function IconButton({
  className,
  onClick,
  icon,
}: {
  className?: string;
  onClick?: () => void;
  icon: React.ReactNode;
}) {
  return (
    <Button
      variant="ghost"
      className={cn('p-0 hover:bg-transparent', className)}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}

export function EditButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      onClick={onClick}
      icon={<IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />}
    />
  );
}

export function DeleteButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      onClick={onClick}
      icon={<IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />}
    />
  );
}

export function ConfirmButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      onClick={onClick}
      icon={<IconCheck style={{ width: '70%', height: '70%' }} stroke={1.5} />}
    />
  );
}
