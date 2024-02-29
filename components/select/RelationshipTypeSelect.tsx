import { useState } from 'react';

import { trpc } from '@/app/_trpc/client';

import { CoreEntityType } from '@prisma/client';

import { IconChevronDown, IconX } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import AddTypeDialog from '../relationship/AddTypeDialog';

export function RelationshipTypeSelect({
  placeholder,
  disabled = false,
  fromType,
  toType,
  onSelect,
  onClear,
}: {
  placeholder?: string;
  disabled?: boolean;
  fromType: keyof typeof CoreEntityType;
  toType: keyof typeof CoreEntityType;
  onSelect: (value?: string) => void;
  onClear?: () => void;
}) {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const { data, refetch } = trpc.relationship.getRelationshipTypes.useQuery({
    filter: {
      entity: fromType && toType ? [fromType, toType] : undefined,
    },
  });

  const relationshipTypeItems = data?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const clearValue = () => {
    setValue(undefined);
    onClear?.();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? relationshipTypeItems?.find(
                (relationshipTypeItems) =>
                  relationshipTypeItems?.value === value,
              )?.label
            : placeholder || 'Pick value'}
          {value ? (
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
      <PopoverContent className="flex flex-col w-56 p-2 gap-2">
        <Command>
          <CommandGroup>
            {relationshipTypeItems?.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  // For some reason, currentValue is coverted to lowercase string? This is a workaround.
                  if (currentValue !== value) {
                    setValue(currentValue);
                  }

                  setOpen(false);

                  if (onSelect) {
                    onSelect(currentValue);
                  }
                }}
              >
                <div className="flex flex-row gap-1">{item.label}</div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
        <AddTypeDialog from={fromType} to={toType} onAdded={refetch}>
          <Button className="w-full">Add Type</Button>
        </AddTypeDialog>
      </PopoverContent>
    </Popover>
  );
}
