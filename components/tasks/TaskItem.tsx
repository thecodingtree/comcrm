'use client';

import { useState } from 'react';

import { IconCalendar } from '@tabler/icons-react';

import { Checkbox } from '@/components/ui/checkbox';
import { CardContent, CardHeader, Card } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { IconExpand, IconCollapse, IconTime } from '@/components/common/icons';

import { TaskResult } from '@/server/task';

import { getTaskIcon, getTaskDateLabel, getPrioirtyBadge } from './utils';

export default function TaskItem({
  task,
  selected,
  onSelectChange,
}: {
  task: TaskResult;
  selected?: boolean;
  onSelectChange?: (selected: boolean) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Collapsible defaultOpen={false} onOpenChange={setIsExpanded}>
      <Card>
        <CollapsibleTrigger className="w-full" asChild>
          <CardHeader className="p-0 text-sm font-medium cursor-pointer">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800/40 rounded-tl-lg rounded-tr-lg">
              <div>
                <div className="flex items-center gap-2 ">
                  <div className="flex mr-2">
                    <Checkbox
                      checked={selected}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectChange && onSelectChange(!selected);
                      }}
                    />
                  </div>
                  {getTaskIcon(task.type)}
                  <span className="">{task.description}</span>
                  <div className="font-light">
                    {task?.assignee?.name
                      ? `Assigned By: ${task?.assignee?.name}`
                      : null}
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-4 items-center">
                <div>{getTaskDateLabel(task.endDate, task.startDate)}</div>
                {isExpanded ? (
                  <IconCollapse className="w-4 h-4" />
                ) : (
                  <IconExpand className="w-4 h-4" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="p-4">
            <div className="grid gap-4 text-gray-500 font-medium">
              <div className="">{task.content}</div>
              <div className="grid gap-2 text-xs  dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <IconTime className="w-4 h-4" />
                  <span className="">{task.endDate.toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCalendar className="w-4 h-4" />
                  <span className="">{task.endDate.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getPrioirtyBadge(task.priority)}
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
