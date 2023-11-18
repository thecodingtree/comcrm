import { Stack } from '@mantine/core';

import { Note, AddNote } from '@/components/content/Notes';

import { trpc } from '@/app/_trpc/client';

export default function EntityNotesBrief({
  entityId,
}: {
  entityId?: string | null;
}) {
  const getNotesForEntity = entityId
    ? trpc.notes.getNotesForEntity.useQuery({ entityId, limit: 3 })
    : null;

  const createNote = trpc.notes.createNote.useMutation({
    onSettled: () => getNotesForEntity?.refetch(),
  });

  if (!entityId) return null;

  return (
    <Stack justify="flex-start">
      {getNotesForEntity?.data?.map((note, index) => (
        <Note
          key={`notes-${index}`}
          date={new Date(note.createdAt)}
          content={note.content}
        />
      ))}
      <AddNote
        onAddNote={(content) => createNote.mutate({ entityId, content })}
      />
    </Stack>
  );
}
