'use client';

import { useState } from 'react';
import { trpc } from '@/app/_trpc/client';

import { Button } from '@/components/ui/button';

import { IconAdd } from '@/components/common/icons';

import { TasksFilter } from '@/server/sharedTypes';

import TasksList from '../tasks/TasksList';
import TaskFilters from '../tasks/TaskFilters';
import AddTaskDialog from '../tasks/AddTaskDialog';
import TaskListSkeleton from '../tasks/TaskListSkeleton';

import { toast } from 'sonner';

export default function DashboardTasks() {
  const [filters, setFilters] = useState<TasksFilter | undefined>({
    type: undefined,
    completed: false,
    endDate: new Date(),
  });

  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const handleSelectChange = (selected: boolean, taskId: string) => {
    if (selected) {
      setSelectedTasks([...selectedTasks, taskId]);
    } else {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    }
  };

  const { data, isLoading, refetch } = trpc.task.getTasks.useQuery({
    type: filters?.type,
    completed: filters?.completed,
    endDate: filters?.endDate,
  });

  const completeTasks = trpc.task.completeTasks.useMutation();

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <div className="flex items-center gap-2">
          <AddTaskDialog onAdded={() => refetch()}>
            <Button className="rounded-full" size="icon" variant="outline">
              <IconAdd className="w-4 h-4" />
            </Button>
          </AddTaskDialog>
          <div className="ml-4 gap-2">
            <TaskFilters
              filters={filters}
              onFilterChange={(filters) => setFilters(filters)}
            />
          </div>
          <div className="m-4">
            <Button
              disabled={selectedTasks.length === 0}
              onClick={() =>
                completeTasks.mutate(
                  { taskIds: selectedTasks },
                  {
                    onSettled: () => {
                      refetch();
                      toast.success('Tasks updated!');
                      setSelectedTasks([]);
                    },
                  },
                )
              }
            >
              Mark Completed
            </Button>
          </div>
        </div>
      </div>
      {!isLoading ? (
        <TasksList
          tasks={data}
          onSelectChange={handleSelectChange}
          selectedTasks={selectedTasks}
        />
      ) : (
        <TaskListSkeleton />
      )}
    </div>
  );
}
