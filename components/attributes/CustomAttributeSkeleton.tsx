import { Skeleton } from '@/components/ui/skeleton';

export default function CustomAttributeSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-5 w-1/2" />
    </div>
  );
}
