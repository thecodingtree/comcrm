import { useState } from 'react';

import { trpc } from '@/app/_trpc/client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import AddTaskForm from '@/components/tasks/AddTaskForm';
import FilterSelect from '../controls/FilterSelect';
import { type TaskData, TaskType } from '@/server/sharedTypes';

import { getTaskIcon } from './utils';

export default function AddTaskDialog({
  children,
  onAdded,
}: {
  children: React.ReactNode;
  onAdded?: (task: TaskData) => void;
}) {
  const [opened, setOpened] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [type, setType] = useState<TaskType | undefined>(TaskType.TODO);

  const createTask = trpc.task.createTask.useMutation();

  const handleSubmit = (values: TaskData) => {
    createTask.mutate(values, {
      onSuccess: (data) => {
        setOpened(false);
        if (onAdded) onAdded(data as TaskData);
      },
      onSettled: () => setSubmitting(false),
    });
  };

  return (
    <div>
      <Dialog open={opened} onOpenChange={setOpened}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <FilterSelect
            allowNone={false}
            allowMultiple={false}
            selected={type}
            onChange={(type) => setType(type as TaskType)}
            items={Object.values(TaskType).map((type) => ({
              key: type,
              icon: getTaskIcon(type),
            }))}
          />
          <AddTaskForm
            submitting={submitting}
            onSubmit={(values) => handleSubmit({ ...values, type: type! })}
            dateType={type === TaskType.EVENT ? 'startDate' : 'dueDate'}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
