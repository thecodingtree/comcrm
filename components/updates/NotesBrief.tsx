import { Note } from '@/components/content/Notes';

import { trpc } from '@/app/_trpc/client';
import { NoteType } from '@/server/sharedTypes';

import useUser from '@/hooks/useUser';

export default function NotesBrief({ entityId }: { entityId?: string | null }) {
  const { user } = useUser();
  const getNotesForEntity = entityId
    ? trpc.notes.getNotesForEntity.useQuery({ entityId, limit: 3 })
    : null;

  const getNoteCreator = (note: NoteType) => {
    const creator = note.creator;

    return creator.id === user?.id ? 'You' : creator.name;
  };

  if (!entityId) return null;

  return (
    <div className="flex flex-col justify-center gap-2">
      {getNotesForEntity?.data?.map((note, index) => (
        <Note
          key={`notes-${index}`}
          date={new Date(note.createdAt)}
          content={note.content}
          creator={getNoteCreator(note) || 'Unknown'}
        />
      ))}
    </div>
  );
}
