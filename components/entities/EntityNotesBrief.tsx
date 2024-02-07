import { Note, AddNote } from '@/components/content/Notes';

import { trpc } from '@/app/_trpc/client';
import { NoteType } from '@/server/sharedTypes';

import useUser from '@/hooks/useUser';

export default function EntityNotesBrief({
  entityId,
}: {
  entityId?: string | null;
}) {
  const { user } = useUser();
  const getNotesForEntity = entityId
    ? trpc.notes.getNotesForEntity.useQuery({ entityId, limit: 3 })
    : null;

  const createNote = trpc.notes.createNote.useMutation({
    onSettled: () => getNotesForEntity?.refetch(),
  });

  const getNoteCreator = (note: NoteType) => {
    const creator = note.creator;

    return creator.id === user?.id ? 'You' : creator.name;
  };

  if (!entityId) return null;

  return (
    <div className="flex flex-col justify-center">
      {getNotesForEntity?.data?.map((note, index) => (
        <Note
          key={`notes-${index}`}
          date={new Date(note.createdAt)}
          content={note.content}
          creator={getNoteCreator(note) || 'Unknown'}
        />
      ))}
      <AddNote
        onAddNote={(content) => createNote.mutate({ entityId, content })}
      />
    </div>
  );
}
