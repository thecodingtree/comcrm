import { Skeleton } from '@/components/ui/skeleton';

export default function RelationshipTypeListSkeleton() {
  const RelationshipTypeItemSkeleton = () => {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-5 w-5 rounded-full" />
        <div className="flex flex-row space-y-2">
          <Skeleton className="h-5 w-[150px]" />
        </div>
        <div className="flex flex-row space-x-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-10 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <RelationshipTypeItemSkeleton />
      <RelationshipTypeItemSkeleton />
    </div>
  );
}
