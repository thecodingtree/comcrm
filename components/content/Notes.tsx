'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { getEntityIcon, getEntityLink } from '@/components/entities/utils';
import { NoteResult } from '@/server/note';

const getDaysSinceDate = (date: Date): number => {
  return Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 86400000,
  );
};

// TODO: This is a very naive implementation of this function
export const getNoteDateLabel = (date: Date): string => {
  const daysSinceDate = getDaysSinceDate(date);

  if (daysSinceDate === 0) {
    return date.toLocaleTimeString('en-US', { timeStyle: 'short' });
  }

  if (daysSinceDate === 1) {
    return (
      'Yesterday at ' + date.toLocaleTimeString('en-US', { timeStyle: 'short' })
    );
  }

  if (daysSinceDate < 7) {
    return `${daysSinceDate} days ago`;
  }

  if (daysSinceDate >= 7 && daysSinceDate < 14) {
    return 'Last week';
  }

  if (daysSinceDate >= 14 && daysSinceDate < 31) {
    return `${Math.floor(daysSinceDate / 7)} weeks ago}`;
  }

  if (daysSinceDate >= 31 && daysSinceDate < 365) {
    return `${Math.floor(daysSinceDate / 31)} month(s) ago`;
  }

  return `${Math.floor(daysSinceDate / 365)} year(s) ago`;
};

export function Note({
  date,
  content,
  creator,
  entity,
}: {
  date: Date;
  content: string;
  creator?: string | undefined;
  entity?: NoteResult['entity'] | undefined;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <CardHeader className="space-y-0 p-1 flex flex-row items-center gap-2 justify-between">
          <div>{content}</div>
        </CardHeader>
        <CardFooter className="flex flex-row justify-between p-0 text-sm text-slate-500">
          {creator ? <div>{creator}</div> : null}
          {entity ? (
            <div className="flex flex-row gap-2 items-center">
              <div>
                {getEntityIcon({
                  entityType: entity?.type,
                  className: 'h-6 w-6',
                })}
              </div>
              <div>
                {getEntityLink({
                  type: entity?.type,
                  id: entity?.id,
                  label: `${entity?.meta?.name} ${entity?.meta?.surName ?? ''}`,
                })}
              </div>
            </div>
          ) : null}
          <div className="font-bold text-xs text-slate-500">
            {getNoteDateLabel(date)}
          </div>
        </CardFooter>
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
