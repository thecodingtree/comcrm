import { useState } from 'react';
import { CoreEntityType, RelationshipType } from '@prisma/client';

import { IconChevronDown } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const getRelationshipsForTypes = (
  from: keyof typeof CoreEntityType,
  to: keyof typeof CoreEntityType
) => {
  if (from === CoreEntityType.CONTACT && to === CoreEntityType.COMPANY) {
    return [
      {
        key: RelationshipType.OWNER_OF,
        label: 'Owner Of',
      },
      {
        key: RelationshipType.EMPLOYED_BY,
        label: 'Employed By',
      },
      {
        key: RelationshipType.AGENT_FOR,
        label: 'Agent For',
      },
    ];
  } else if (from === CoreEntityType.COMPANY && to === CoreEntityType.CONTACT) {
    return [
      {
        key: RelationshipType.OWNED_BY,
        label: 'Owned By',
      },
      {
        key: RelationshipType.EMPLOYED_BY,
        label: 'Employed By',
      },
    ];
  } else if (
    from === CoreEntityType.PROPERTY &&
    to === CoreEntityType.CONTACT
  ) {
    return [
      {
        key: RelationshipType.OWNED_BY,
        label: 'Owned By',
      },
      {
        key: RelationshipType.LEASED_TO,
        label: 'Leased To',
      },
      {
        key: RelationshipType.LEASED_BY,
        label: 'Leased By',
      },
      {
        key: RelationshipType.SOLD_TO,
        label: 'Sold To',
      },
    ];
  } else if (
    from === CoreEntityType.CONTACT &&
    to === CoreEntityType.PROPERTY
  ) {
    return [
      {
        key: RelationshipType.OWNER_OF,
        label: 'Owner Of',
      },
      {
        key: RelationshipType.AGENT_FOR,
        label: 'Agent For',
      },
      {
        key: RelationshipType.INTERESTED_IN,
        label: 'Interested In',
      },
    ];
  } else if (
    from === CoreEntityType.COMPANY &&
    to === CoreEntityType.PROPERTY
  ) {
    return [
      {
        key: RelationshipType.OWNER_OF,
        label: 'Owner Of',
      },
      {
        key: RelationshipType.INTERESTED_IN,
        label: 'Interested In',
      },
      {
        key: RelationshipType.AGENT_FOR,
        label: 'Agent For',
      },
      {
        key: RelationshipType.INTERESTED_IN,
        label: 'Interested In',
      },
    ];
  } else if (
    from === CoreEntityType.PROPERTY &&
    to === CoreEntityType.COMPANY
  ) {
    return [
      {
        key: RelationshipType.OWNED_BY,
        label: 'Owned By',
      },
      {
        key: RelationshipType.LEASED_TO,
        label: 'Leased To',
      },
      {
        key: RelationshipType.LEASED_BY,
        label: 'Leased By',
      },
      {
        key: RelationshipType.SOLD_TO,
        label: 'Sold To',
      },
    ];
  }

  return [];
};

export function RelationshipTypeSelect({
  placeholder,
  disabled = false,
  fromType,
  toType,
  onSelect,
}: {
  placeholder?: string;
  disabled?: boolean;
  fromType: keyof typeof CoreEntityType;
  toType: keyof typeof CoreEntityType;
  onSelect: (value?: RelationshipType) => void;
}) {
  const [value, setValue] = useState<RelationshipType | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const relationshipTypeItems = getRelationshipsForTypes(fromType, toType).map(
    (item) => ({
      value: item.key,
      label: item.label,
    })
  );

  const clearValue = () => {
    setValue(undefined);

    if (onSelect) {
      onSelect(undefined);
    }
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
                  relationshipTypeItems?.value === value
              )?.label
            : placeholder || 'Pick value'}
          <IconChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0">
        <Command>
          <CommandGroup>
            {relationshipTypeItems.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  // For some reason, currentValue is coverted to lowercase string? This is a workaround.
                  const selValue =
                    currentValue.toUpperCase() as RelationshipType;

                  if (selValue !== value) {
                    setValue(selValue);
                  }

                  setOpen(false);

                  if (onSelect) {
                    onSelect(selValue);
                  }
                }}
              >
                <div className="flex flex-row gap-1">{item.label}</div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
