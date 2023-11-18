import { useState, useEffect } from 'react';
import {
  Button,
  CloseButton,
  Combobox,
  TextInput,
  Loader,
  useCombobox,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { trpc } from '@/app/_trpc/client';

import { EntitySearchResult } from '@/server/sharedTypes';

import { SelectOptionCustom } from '@/components/select/SelectWithCustomOption';
import { useDebouncedValue } from '@mantine/hooks';

import { CoreEntityType } from '@prisma/client';

import EntityAddModal from '@/components/entities/EntityAddModal';

export function EntityAutocomplete({
  type,
  disabled = false,
  onEntitySelected,
  withAddOption = false,
}: {
  type?: CoreEntityType;
  disabled?: boolean;
  onEntitySelected?: (entity: EntitySearchResult) => void;
  withAddOption?: boolean;
}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [value, setValue] = useState<string | null>(null);
  const [searchQuery] = useDebouncedValue(value, 200);
  const [entity, setEntity] = useState<EntitySearchResult | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const { data, isLoading } = trpc.relationship.getEntitiesForSearch.useQuery(
    {
      filter: searchQuery ? { name: searchQuery! } : undefined,
      type,
    },
    { trpc: { abortOnUnmount: true } }
  );

  const clearValues = () => {
    setValue(null);
    setEntity(null);
  };

  const items = data?.map((item) => ({
    value: item.id,
    label: item.name,
    description: item.type,
  }));

  const options = (
    items: { value: string; label: string; description: CoreEntityType }[]
  ) => {
    const resultOptions = items?.map((item) => (
      <Combobox.Option value={item.value} key={item.value}>
        <SelectOptionCustom {...item} />
      </Combobox.Option>
    ));

    return resultOptions?.length ? (
      <Combobox.Options>{resultOptions}</Combobox.Options>
    ) : (
      withAddOption && (
        <Combobox.Option value={'add_entity'} key={'add_entity'}>
          <Button w="100%" onClick={open}>
            Add {searchQuery}
          </Button>
        </Combobox.Option>
      )
    );
  };

  useEffect(() => {
    if (entity && onEntitySelected) {
      onEntitySelected(entity);
    }
  }, [onEntitySelected, entity]);

  const inputRightSection = () => {
    if (isLoading && !disabled) {
      return <Loader size={18} />;
    }

    if (entity) {
      return (
        <CloseButton
          size="sm"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => clearValues()}
          aria-label="Clear value"
        />
      );
    }

    return null;
  };

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setEntity(data?.find((item) => item.id === optionValue) || null);
        combobox.closeDropdown();
      }}
      withinPortal={true}
      store={combobox}
      disabled={disabled}
    >
      <Combobox.Target>
        <TextInput
          placeholder="Search entities"
          value={entity?.name || (value ?? '')}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            setEntity(null);
            combobox.resetSelectedOption();
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => {
            combobox.openDropdown();
          }}
          onBlur={() => combobox.closeDropdown()}
          rightSectionPointerEvents={entity === null ? 'none' : 'all'}
          multiline
          disabled={disabled}
          rightSection={inputRightSection()}
        />
      </Combobox.Target>

      <Combobox.Dropdown
        hidden={(value?.length || 0) === 0 || isLoading || entity !== null}
        onReset={() => setEntity(null)}
      >
        {options(items || [])}
      </Combobox.Dropdown>
      <EntityAddModal
        name={value!}
        entityType={type!}
        onAdded={(entity) => setEntity(entity)}
        opened={opened}
        close={close}
      />
    </Combobox>
  );
}
