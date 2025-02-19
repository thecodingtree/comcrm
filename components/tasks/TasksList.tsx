'use client';

import TaskItem from './TaskItem';
import { type TaskResult } from '@/server/task';

export default function TasksList({
  tasks,
  selectedTasks,
  onSelectChange,
}: {
  tasks: TaskResult[] | undefined;
  selectedTasks: string[];
  onSelectChange?: (selected: boolean, taskId: string) => void;
}) {
  const hasTasks = tasks?.length;

  return (
    <div className="flex flex-col gap-2">
      {hasTasks ? (
        tasks?.map((task) => (
          <div key={task.id}>
            <TaskItem
              task={task}
              selected={selectedTasks.some(
                (selectedTask) => selectedTask === task.id,
              )}
              onSelectChange={(selected) =>
                onSelectChange && onSelectChange(selected, task.id)
              }
            />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-gray-400 dark:text-gray-600">No Tasks Found</p>
        </div>
      )}
    </div>
  );
}
