import { Prisma, PrismaClient, TaskPriority } from '@prisma/client';
import { getAuthedServerSession } from './utils';

import { TaskType, TasksFilter } from './sharedTypes';

export async function createTask({
  db,
  creator,
  assignee,
  type,
  description,
  content,
  entity,
  priority = TaskPriority.LOW,
  isPrivate = false,
  completed = false,
  startDate,
  endDate,
}: {
  db: PrismaClient;
  creator: string;
  assignee?: string;
  type: TaskType;
  description: string;
  content?: string;
  entity?: string;
  priority?: TaskPriority;
  isPrivate?: boolean;
  completed?: boolean;
  startDate?: Date;
  endDate: Date;
}) {
  return db.task.create({
    data: {
      creatorId: creator,
      assigneeId: assignee,
      type,
      description,
      content,
      entityId: entity,
      priority,
      private: isPrivate,
      completed,
      startDate,
      endDate,
    },
  });
}

const taskInclude = Prisma.validator<Prisma.TaskInclude>()({
  assignee: true,
});

export type TaskResult = Prisma.TaskGetPayload<{
  include: typeof taskInclude;
}>;

export async function getTasks({
  db,
  filter,
  limit,
}: {
  db: PrismaClient;
  filter?: TasksFilter;
  limit?: number;
}) {
  const filters = {} as {
    type: TaskType | { in: TaskType[] } | undefined;
    completed: boolean;
    startDate: { lte: Date };
    endDate: { gte: Date };
    entityId: string;
  };

  filters.type = filter?.type
    ? Array.isArray(filter.type)
      ? { in: filter.type }
      : filter.type
    : undefined;

  if (filter?.completed !== undefined) {
    filters.completed = filter.completed;
  }

  if (filter?.startDate) {
    filters.startDate = { lte: filter.startDate };
  }

  if (filter?.endDate) {
    filters.endDate = { gte: filter.endDate };
  }

  if (filter?.entity) {
    filters.entityId = filter.entity;
  }

  return db.task.findMany({
    include: taskInclude,
    where: filters,
    orderBy: { endDate: 'asc' },
    take: limit,
  });
}

export type TaskResponse = typeof getTasks;
