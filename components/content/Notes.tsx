'use client';

import { useState } from 'react';
import { Text, Textarea, Stack, Group, Paper, Button } from '@mantine/core';
import classes from './Notes.module.css';

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

  console.log('daysSinceDate', daysSinceDate);

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
    <Paper withBorder radius="md" className={classes.note}>
      <Stack>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            {getDaysSinceDateText(date)}
          </Text>
        </Group>
        <Text>{content}</Text>
      </Stack>
    </Paper>
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
      return;
    }

    if (onAddNote && content.length > 0) {
      onAddNote(content);
    }

    setShowAddNote(false);
  };

  return (
    <Paper radius="md" className={classes.note}>
      <Stack>
        {showAddNote && (
          <Textarea
            autosize
            minRows={4}
            maxRows={8}
            placeholder="Enter Note"
            onChange={(e) => setContent(e.currentTarget.value)}
          />
        )}
        <Button fullWidth onClick={handleAddNote}>
          {showAddNote ? 'Submit' : 'Add Note'}
        </Button>
      </Stack>
    </Paper>
  );
}
