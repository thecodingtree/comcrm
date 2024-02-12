'use client';

import { trpc } from '@/app/_trpc/client';
import TaskItem from './TaskItem';
import TaskListSkeleton from './TaskListSkeleton';

export default function TasksList({ category }: { category?: string }) {
  const { data, isLoading } = trpc.task.getTasksForUser.useQuery({
    category,
  });

  return !isLoading ? (
    <div className="flex flex-col gap-2">
      {data?.map((task) => (
        <div key={task.id}>
          <TaskItem
            category={task.category?.icon ?? undefined}
            time={task.endDate.toLocaleTimeString()}
            date={task.endDate.toLocaleDateString()}
            description={task.description}
            content={task.content ?? ''}
          />
        </div>
      ))}
    </div>
  ) : (
    <TaskListSkeleton />
  );
}
