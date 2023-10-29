import { Stack } from '@mantine/core';

import { Note, AddNote } from '@/components/content/Notes';

import { trpc } from '@/app/_trpc/client';

export default function EntityNotes({
  entityId,
}: {
  entityId?: string | null;
}) {
  const getNotesForEntity = trpc.notes.getNotesForEntity.useQuery();

  return (
    <Stack justify="flex-start">
      {getNotesForEntity?.data?.map((note, index) => (
        <Note
          key={`notes-${index}`}
          date={new Date(note.createdAt)}
          content={note.content}
        />
      ))}
      <AddNote />
    </Stack>
  );
}
