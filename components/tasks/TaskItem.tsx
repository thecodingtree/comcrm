'use client';

import { useState } from 'react';

import { IconCalendar } from '@tabler/icons-react';

import { CardContent, CardHeader, Card } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { IconExpand, IconCollapse, IconTime } from '@/components/common/icons';

import { TaskType } from '@/server/sharedTypes';

import { getTaskIcon, getTaskDateLabel } from './utils';

export default function TaskItem({
  type,
  startDate,
  endDate,
  description,
  content,
  assignedBy,
}: {
  type: TaskType;
  startDate?: Date;
  endDate: Date;
  description: string;
  content?: string;
  assignedBy?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Collapsible defaultOpen={false} onOpenChange={setIsExpanded}>
      <Card>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="p-0 text-sm font-medium">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800/40 rounded-tl-lg rounded-tr-lg">
              <div>
                <div className="flex items-center gap-2 ">
                  {getTaskIcon(type)}
                  <span className="">{description}</span>
                  <div className="font-light">
                    {assignedBy ? `Assigned By: ${assignedBy}` : null}
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-4 items-center">
                <div>{getTaskDateLabel(endDate, startDate)}</div>
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
              <div className="">{content}</div>
              <div className="grid gap-2 text-xs  dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <IconTime className="w-4 h-4" />
                  <span className="">{endDate.toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCalendar className="w-4 h-4" />
                  <span className="">{endDate.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
