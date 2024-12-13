'use client';

import { useState } from 'react';

import { trpc } from '@/app/_trpc/client';

import { Note } from '@/components/content/Notes';

import { CoreEntityType } from '@prisma/client';
import { getEntityIcon } from '@/components/entities/utils';
import { type NotesFilterType } from '@/server/sharedTypes';

import FilterSelect from '@/components/controls/FilterSelect';

const entityFilterItems = Object.values(CoreEntityType).map((type) => ({
  key: type,
  icon: getEntityIcon({ type, className: 'w-5 h-5' }),
}));

export default function DashboardNotes() {
  const [selectedTypes, setSelectedTypes] = useState<CoreEntityType[]>([]);
  const [filter, setFilter] = useState<NotesFilterType>({
    entity: { type: selectedTypes },
  });
  const { data } = trpc.notes.getNotesForMe.useQuery({
    filter,
    limit: 10,
  });

  return (
    <div className="flex flex-col gap-2">
      <div>
        <FilterSelect
          selected={filter?.entity?.type}
          onChange={(types) => {
            setFilter({
              ...filter,
              entity: { ...filter.entity, type: types as CoreEntityType[] },
            });
          }}
          allowMultiple
          allowNone
          items={entityFilterItems}
        />
      </div>
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
    </div>
  );
}
