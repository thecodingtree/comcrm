'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface NoteProps {
  date: Date;
  content: string;
}

const getDaysSinceDate = (date: Date): number => {
  return Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 86400000
  );
};

// TODO: This is a very naive implementation of this function
const getDaysSinceDateText = (date: Date): string => {
  const daysSinceDate = getDaysSinceDate(date);

  if (daysSinceDate === 0) {
    return 'Today';
  }

  if (daysSinceDate === 1) {
    return 'Yesterday';
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

export function Note({ date, content }: NoteProps) {
  return (
    <div className="border border-slate-200 rounded-sm p-2 m-2">
      <div className="flex flex-col gap-2">
        <p className="text-xs text-slate-400">{getDaysSinceDateText(date)}</p>
        <p>{content}</p>
      </div>
    </div>
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
