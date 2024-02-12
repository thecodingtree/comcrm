'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { IconPlus } from '@/components/common/icons';

import { IconCall, IconEvent, IconTodo } from './icons';

import TasksList from './TasksList';
import TaskFilters from './TaskFilters';

export default function Tasks() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-2">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <div className="flex items-center gap-2">
          <Button className="rounded-full" size="icon" variant="outline">
            <IconPlus className="w-4 h-4" />
            <span className="sr-only">Add</span>
          </Button>
          <div className="ml-4 gap-2">
            <TaskFilters />
          </div>
        </div>
      </div>
      <TasksList />
    </div>
  );
}
