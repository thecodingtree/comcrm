'use client';

import TaskItem from './TaskItem';
import { TaskResult } from '@/server/task';

export default function TasksList({
  tasks,
}: {
  tasks: TaskResult[] | undefined;
}) {
  return (
    <div className="flex flex-col gap-2">
      {tasks?.map((task) => (
        <div key={task.id}>
          <TaskItem
            type={task.type}
            startDate={task.startDate ?? undefined}
            endDate={task.endDate}
            description={task.description}
            content={task.content ?? ''}
            assignedBy={task.assignee?.name ?? undefined}
          />
        </div>
      ))}
    </div>
  );
}
