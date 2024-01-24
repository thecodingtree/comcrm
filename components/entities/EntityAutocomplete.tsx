import React, { useState } from 'react';

import { IconSearch, IconChevronDown } from '@tabler/icons-react';

import Loader from '@/components/common/Loader';

import { Button } from '@/components/ui/button';
import IconInput from '@/components/controls/IconInput';

import EntityAddDialog from '@/components/entities/EntityAddDialog';

import { trpc } from '@/app/_trpc/client';

import { EntitySearchResult } from '@/server/sharedTypes';

import { useDebouncedState } from '@/lib/hooks';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { CoreEntityType } from '@prisma/client';

const EntityList = ({
  entities,
  onEntitySelected,
}: {
  entities?: EntitySearchResult[];
  onEntitySelected: (id: string) => void;
}) => {
  return (
    <CommandList>
      <CommandGroup>
        {entities?.map((entity) => (
          <CommandItem
            key={entity.id}
            value={entity.id}
            onSelect={onEntitySelected}
          >
            {entity.name}
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  );
};

export function EntityAutocomplete({
  type,
  disabled = false,
  onEntitySelected,
}: {
  type?: CoreEntityType;
  disabled?: boolean;
  onEntitySelected?: (entity: EntitySearchResult) => void;
  withAddOption?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useDebouncedState('', 200);
  const [entity, setEntity] = useState<EntitySearchResult | null>(null);

  const { data, isLoading, refetch } =
    trpc.relationship.getEntitiesForSearch.useQuery(
      {
        filter: searchQuery ? { name: searchQuery! } : undefined,
        type,
      },
      {
        trpc: { abortOnUnmount: true },
        refetchOnMount: false,
      }
    );

  const onEntitySelectedHandler = (id: string) => {
    const entity = data?.find((entity) => entity.id === id)!;

    setEntity(entity);
    setOpen(false);

    if (onEntitySelected) {
      onEntitySelected(entity);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {entity ? entity?.name : 'Select entity...'}
          <IconChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Command>
          <IconInput
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            placeholder="Search entities..."
            icon={isLoading ? <Loader /> : <IconSearch />}
          />
          {!isLoading &&
            (data && data?.length ? (
              <EntityList
                entities={data}
                onEntitySelected={onEntitySelectedHandler}
              />
            ) : (
              <EntityAddDialog
                entityType={type!}
                triggerLabel={`Add ${searchQuery ? searchQuery : 'New Enity'}`}
                defaultName={searchQuery ?? ''}
                onAdded={(data) => {
                  setEntity(data);
                  setOpen(false);

                  if (onEntitySelected) {
                    onEntitySelected(data);
                  }
                }}
              />
            ))}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
