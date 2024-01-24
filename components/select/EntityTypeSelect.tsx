import { useState } from 'react';
import { CoreEntityType } from '@prisma/client';
import { IconChevronDown } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  IconCompany,
  IconContact,
  IconProperty,
} from '@/components/common/icons';

const enityTypeItems = [
  {
    icon: <IconContact />,
    label: 'Contact',
    value: CoreEntityType.CONTACT,
  },
  {
    icon: <IconCompany />,
    label: 'Company',
    value: CoreEntityType.COMPANY,
  },
  {
    icon: <IconProperty />,
    label: 'Property',
    value: CoreEntityType.PROPERTY,
  },
];

export function EntityTypeSelect({
  placeholder,
  excludeType,
  onSelect,
}: {
  placeholder?: string;
  excludeType?: CoreEntityType;
  onSelect: (value?: CoreEntityType) => void;
}) {
  const [value, setValue] = useState<CoreEntityType | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const items = excludeType
    ? enityTypeItems.filter((item) => item.value !== excludeType)
    : enityTypeItems;

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
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? items?.find((item) => item.value === value)?.label
            : placeholder || 'Pick value'}
          <IconChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0">
        <Command>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  // For some reason, currentValue is coverted to lowercase string? This is a workaround.
                  const selValue = currentValue.toUpperCase() as CoreEntityType;

                  if (selValue !== value) {
                    setValue(selValue);
                  }

                  setOpen(false);

                  if (onSelect) {
                    onSelect(selValue);
                  }
                }}
              >
                <div className="flex flex-row gap-1">
                  {item.icon}
                  {item.label}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
