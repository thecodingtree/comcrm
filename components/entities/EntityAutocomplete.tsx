import React, { useState } from 'react';

import { IconSearch, IconChevronDown, IconX } from '@tabler/icons-react';

import Loader from '@/components/common/Loader';

import { Button } from '@/components/ui/button';
import IconInput from '@/components/controls/IconInput';

import EntityAddDialog from '@/components/entities/EntityAddDialog';

import { trpc } from '@/app/_trpc/client';

import { EntitySearchResult } from '@/server/sharedTypes';

import { useDebouncedState } from '@/libs/hooks';

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
  onEntityCleared,
}: {
  type?: CoreEntityType;
  disabled?: boolean;
  onEntitySelected?: (entity: EntitySearchResult) => void;
  onEntityCleared?: () => void;
  withAddOption?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useDebouncedState('', 200);
  const [entity, setEntity] = useState<EntitySearchResult | null>(null);

  const { data, isLoading, refetch } =
    trpc.relationship.getEntitiesForSearch.useQuery(
      {
        search: searchQuery,
        filter: type ? { type: [type] } : undefined,
      },
      {
        trpc: { abortOnUnmount: true },
        refetchOnMount: false,
      },
    );

  const clearValue = () => {
    setEntity(null);
    onEntityCleared?.();
  };

  const onEntitySelectedHandler = (id: string) => {
    const entity = data?.find((entity) => entity.id === id)!;

    setEntity(entity);
    setOpen(false);

    onEntitySelected?.(entity);
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
          {entity ? (
            <IconX
              onClick={(e) => {
                e.preventDefault();
                clearValue();
              }}
              className="ml-2 h-4 w-4 shrink-0 opacity-50"
            />
          ) : (
            <IconChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col p-2 gap-2">
        <Command>
          <IconInput
            className="pr-2"
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            placeholder="Search entities..."
            icon={isLoading ? <Loader /> : <IconSearch />}
          />
          <CommandGroup>
            {!isLoading && (
              <CommandItem>
                <EntityList
                  entities={data}
                  onEntitySelected={onEntitySelectedHandler}
                />
              </CommandItem>
            )}
          </CommandGroup>
        </Command>
        <EntityAddDialog
          entityType={type!}
          triggerLabel="Add New Enity"
          defaultName={searchQuery ?? ''}
          onAdded={(data) => {
            setEntity(data);
            setOpen(false);

            if (onEntitySelected) {
              onEntitySelected(data);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
