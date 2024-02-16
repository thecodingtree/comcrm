import { trpc } from '@/app/_trpc/client';

import Task from '@/components/content/Task';

export default function TasksBrief({ entityId }: { entityId: string }) {
  const { data, isLoading } = trpc.task.getTasks.useQuery({
    entity: entityId,
    completed: false,
    limit: 3,
  });

  return (
    <div className="flex flex-col gap-1 pt-4">
      {data?.map((task) => (
        <div key={task.id}>
          <Task
            type={task.type}
            description={task.description}
            content={task.content || undefined}
            endDate={task.endDate}
            startDate={task.startDate || undefined}
          />
        </div>
      ))}
    </div>
  );
}
