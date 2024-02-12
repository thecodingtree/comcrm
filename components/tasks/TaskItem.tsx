'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, Card } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { IconExpand, IconCollapse, IconTime } from '@/components/common/icons';
import { IconEvent, IconCall, IconTodo } from './icons';

const getIcon = (category: string) => {
  switch (category) {
    case 'call':
      return <IconCall className="w-4 h-4" />;
    case 'event':
      return <IconEvent className="w-4 h-4" />;
    case 'todo':
      return <IconTodo className="w-4 h-4" />;
    default:
      return null;
  }
};

export default function TaskItem({
  category,
  time,
  date,
  description,
  content,
}: {
  category: string;
  time: string;
  date: string;
  description: string;
  content?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Collapsible defaultOpen={false} onOpenChange={setIsExpanded}>
      <Card>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="p-0">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800/40 rounded-tl-lg rounded-tr-lg">
              <div className="flex items-center gap-2 text-sm font-medium">
                {getIcon(category)}
                <span className="font-semibold">{description}</span>
              </div>
              <Button className="rounded-full" size="icon" variant="ghost">
                {isExpanded ? (
                  <IconCollapse className="w-4 h-4" />
                ) : (
                  <IconExpand className="w-4 h-4" />
                )}
                <span className="sr-only">More</span>
              </Button>
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
                  <span className="">{time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconEvent className="w-4 h-4" />
                  <span className="">{date}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
