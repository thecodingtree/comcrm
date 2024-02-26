import { Note } from '@/components/content/Notes';

import { trpc } from '@/app/_trpc/client';
import { NoteType } from '@/server/sharedTypes';

import useUser from '@/hooks/useUser';

import { AddNote } from '@/components/content/Notes';
import { on } from 'events';

export default function NotesBrief({ entityId }: { entityId?: string | null }) {
  const { user } = useUser();
  const getNotes = entityId
    ? trpc.notes.getNotes.useQuery({ filter: { entityId }, limit: 3 })
    : null;

  const createNote = trpc.notes.createNote.useMutation();

  const getNoteCreator = (note: NoteType) => {
    const creator = note.creator;

    return creator.id === user?.id ? 'You' : creator.name;
  };

  if (!entityId) return null;

  return (
    <div className="flex flex-col justify-center gap-2">
      {getNotes?.data?.map((note, index) => (
        <Note
          key={`notes-${index}`}
          date={new Date(note.createdAt)}
          content={note.content}
          creator={getNoteCreator(note) || 'Unknown'}
        />
      ))}
      <div>
        <AddNote
          onAddNote={(content) =>
            createNote.mutate(
              { entityId: entityId!, content },
              { onSettled: () => getNotes?.refetch() },
            )
          }
        />
      </div>
    </div>
  );
}
