'use client';

import React, { useState, useEffect } from 'react';

import { trpc } from '@/app/_trpc/client';

import { useDebouncedState } from '@/libs/hooks';

import { Command, CommandItem, CommandGroup } from '@/components/ui/command';

import { IconSearch } from '@tabler/icons-react';
import IconInput from '@/components/controls/IconInput';
import Link from 'next/link';

import { getEntityPath, getEntityIcon } from './utils';

export default function EntitySearch() {
  const [value, setValue] = useState('');
  const [searchQuery, setSearchQuery] = useDebouncedState('', 200);

  useEffect(() => {
    setSearchQuery(value);
  }, [value, setSearchQuery]);

  const { data, isLoading, refetch } =
    trpc.relationship.getEntitiesForSearch.useQuery(
      {
        search: searchQuery,
        filter: { type: ['CONTACT', 'COMPANY', 'PROPERTY'] },
      },
      {
        trpc: { abortOnUnmount: true },
        refetchOnMount: false,
      },
    );

  const showResults = !isLoading && (data?.length ?? 0) > 0;

  return (
    <div className="flex flex-col items-center justify-between w-full px-4">
      <div className="w-full">
        <Command className="relative overflow-visible">
          <IconInput
            className="pr-2"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            placeholder="Search Contacts, Companies, or Properties..."
            icon={<IconSearch />}
          />
          {showResults && (
            <CommandGroup className="absolute bg-white border-2 rounded-sm top-10 w-full z-20 mt-1">
              {data?.map((entity) => (
                <CommandItem
                  key={entity.id}
                  value={entity.id}
                  onSelect={(value) => console.log(value)}
                >
                  <Link
                    className=" flex flex-row gap-2 items-center w-full"
                    href={`${getEntityPath(entity.type)}/${entity.id}`}
                    onClick={() => setValue('')}
                  >
                    {getEntityIcon({ type: entity.type })}
                    {entity.name}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </Command>
      </div>
    </div>
  );
}
