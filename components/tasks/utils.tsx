import {
  TaskIconEvent,
  TaskIconCall,
  TaskIconTodo,
  TaskIconEmail,
  TaskIconFolllowUp,
  TaskIconOther,
} from './icons';

import { TaskType } from '@/server/sharedTypes';
import { cn } from '@/libs/utils';

export const getTaskIcon = (type?: TaskType, className?: string) => {
  const classes = cn('w-4 h-4', className);

  switch (type) {
    case TaskType.CALL:
      return <TaskIconCall className={classes} />;
    case TaskType.EMAIL:
      return <TaskIconEmail className={classes} />;
    case TaskType.EVENT:
      return <TaskIconEvent className={classes} />;
    case TaskType.FOLLOW_UP:
      return <TaskIconFolllowUp className={classes} />;
    case TaskType.TODO:
      return <TaskIconTodo className={classes} />;
    case TaskType.OTHER:
      return <TaskIconOther className={classes} />;
    default:
      return null;
  }
};

export const getTaskDateLabel = (endDate: Date, startDate?: Date) => {
  if (startDate) {
    return `${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`;
  }

  const now = new Date();

  switch (endDate.getDate() - now.getDate()) {
    case 0:
      return 'Today';
    case 1:
      return 'Tomorrow';
    default:
      return endDate.toLocaleDateString();
  }
};
