import { useState } from 'react';

import {
  Group,
  Combobox,
  InputBase,
  Input,
  CloseButton,
  useCombobox,
} from '@mantine/core';

export type Item = {
  value: string;
  label?: string;
  icon?: JSX.Element;
  description?: string;
};

export function SelectOptionCustom({ icon, label, value, description }: Item) {
  return (
    <Group>
      {icon}
      <div>
        <p className="text-sm font-medium">{label || value}</p>
        {description && <p className="text-xs text-slate-400">{description}</p>}
      </div>
    </Group>
  );
}

export function SelectWithCustomOption({
  items,
  disabled = false,
  placeholder,
  onSelect,
}: {
  items: Item[];
  disabled?: boolean;
  placeholder?: string;
  onSelect: (value?: string) => void;
}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | undefined>(undefined);
  const selectedOption = items.find((item) => item.value === value);

  const clearValue = () => {
    setValue(undefined);

    if (onSelect) {
      onSelect(undefined);
    }
  };

  const options = items.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      <SelectOptionCustom {...item} />
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={true}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();

        if (onSelect) {
          onSelect(val);
        }
      }}
      disabled={disabled}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents={value === null ? 'none' : 'all'}
          multiline
          disabled={disabled}
          rightSection={
            value ? (
              <CloseButton
                size="sm"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => clearValue()}
                aria-label="Clear value"
              />
            ) : (
              <Combobox.Chevron />
            )
          }
        >
          {selectedOption ? (
            <SelectOptionCustom {...selectedOption} />
          ) : (
            <Input.Placeholder>{placeholder || 'Pick value'}</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
