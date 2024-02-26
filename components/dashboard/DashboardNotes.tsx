'use client';

import { trpc } from '@/app/_trpc/client';

import { Note } from '@/components/content/Notes';

export default function DashboardNotes() {
  const { data } = trpc.notes.getNotesForMe.useQuery({
    limit: 10,
  });

  return (
    <div className="flex flex-col gap-2">
      {data?.map((note) => (
        <div key={note.id}>
          <Note
            date={note.createdAt}
            content={note.content}
            entity={note.entity}
          />
        </div>
      )) ?? undefined}
    </div>
  );
}
