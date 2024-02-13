'use client';

import { useState } from 'react';
import { trpc } from '@/app/_trpc/client';

import { Button } from '@/components/ui/button';

import { IconPlus } from '@/components/common/icons';

import { TasksFilter } from '@/server/sharedTypes';

import TasksList from './TasksList';
import TaskFilters from './TaskFilters';
import AddTaskDialog from './AddTaskDialog';
import TaskListSkeleton from './TaskListSkeleton';

export default function Tasks() {
  const [filters, setFilters] = useState<TasksFilter | undefined>({
    type: undefined,
    completed: false,
    endDate: new Date(),
  });

  const { data, isLoading, refetch } = trpc.task.getTasksForUser.useQuery({
    type: filters?.type,
    completed: filters?.completed,
    endDate: filters?.endDate,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <h1 className="text-2xl font-bold">Today&apos;s Tasks</h1>
        <div className="flex items-center gap-2">
          <AddTaskDialog onAdded={() => refetch()}>
            <Button className="rounded-full" size="icon" variant="outline">
              <IconPlus className="w-4 h-4" />
            </Button>
          </AddTaskDialog>
          <div className="ml-4 gap-2">
            <TaskFilters
              filters={filters}
              onFilterChange={(filters) => setFilters(filters)}
            />
          </div>
        </div>
      </div>
      {!isLoading ? <TasksList tasks={data} /> : <TaskListSkeleton />}
    </div>
  );
}
