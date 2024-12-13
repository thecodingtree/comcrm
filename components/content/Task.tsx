'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { type TaskType } from '@/server/sharedTypes';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { getTaskIcon } from '@/components/tasks/utils';
import { getTaskDueLabel } from '@/components/content/utils';

export default function Task({
  type,
  description,
  content,
  creator,
  endDate,
  startDate,
}: {
  type: TaskType;
  description: string;
  content?: string | undefined;
  creator?: string | undefined;
  endDate: Date;
  startDate?: Date;
}) {
  return (
    <Card>
      <CardContent className="p-2">
        <CardHeader className="space-y-0 p-1 flex flex-row items-center gap-2 font-medium justify-between">
          <div className="font-bold text-xs text-slate-500">
            {getTaskDueLabel(endDate)}
          </div>
          <div>{description}</div>
          <div>{getTaskIcon(type)}</div>
        </CardHeader>
        <CardDescription></CardDescription>
        {/* TODO: may show this in the future {content && <div>{content}</div>} */}
      </CardContent>
    </Card>
  );
}

interface AddNoteProps {
  onAddNote?: (note: string) => void;
}

export function AddNote({ onAddNote }: AddNoteProps) {
  const [showAddNote, setShowAddNote] = useState(false);
  const [content, setContent] = useState('');

  const handleAddNote = () => {
    // Initially just show the edit box
    if (!showAddNote) {
      setShowAddNote(true);
      setContent('');
      return;
    }

    if (onAddNote && content.length > 0) {
      onAddNote(content);
    }

    setShowAddNote(false);
  };

  return (
    <div className="m-4">
      <div className="flex flex-col gap-2">
        {showAddNote && (
          <Textarea
            placeholder="Enter Note"
            onChange={(e) => setContent(e.currentTarget.value)}
          />
        )}
        <Button className="w-full" onClick={handleAddNote}>
          {showAddNote ? 'Submit' : 'Add Note'}
        </Button>
      </div>
    </div>
  );
}
