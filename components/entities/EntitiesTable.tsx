'use client';

import { useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
} from '@mantine/core';
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from '@tabler/icons-react';

import classes from './EntitiesTable.module.css';

type RowData = Company | Contact | Property;

interface ThSortableProps {
  key: string;
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ key, children }: { key: string; children: React.ReactNode }) {
  return (
    <Table.Th key={key} className={classes.th}>
      <Text fw={500} fz="sm">
        {children}
      </Text>
    </Table.Th>
  );
}

function ThSortable({
  key,
  children,
  reversed,
  sorted,
  onSort,
}: ThSortableProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Th key={key}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) =>
      item[key] ? item[key]?.toString().toLowerCase().includes(query) : false
    )
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  // TODO: THIS IS NOT GREAT, FIX IT!
  return filterData(
    [...data].sort((a, b) => {
      if (a[sortBy] && b[sortBy]) return 1;

      if (payload.reversed) {
        return (
          b[sortBy]?.toString().localeCompare(a[sortBy]?.toString() ?? '') ?? 0
        );
      }

      return (
        a[sortBy]?.toString().localeCompare(b[sortBy]?.toString() ?? '') ?? 0
      );
    }),
    payload.search
  );
}

export type ETColumn = {
  name: string;
  key: keyof RowData;
  sortable: boolean;
};

export interface EntitiesTableProps {
  entities: any[];
  columns: ETColumn[];
  rowRenderer?(row: any): React.ReactNode;
}

export function EntitiesTable({
  entities,
  columns,
  rowRenderer,
}: EntitiesTableProps) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(entities);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(entities, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(entities, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const rows = sortedData.map((row) => {
    return rowRenderer ? (
      rowRenderer(row)
    ) : (
      <div>Row Renderer not Defined!</div>
    );
  });

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Tbody>
          <Table.Tr>
            {columns.map((column) => {
              return column.sortable ? (
                <ThSortable
                  key={column.key}
                  sorted={sortBy === column.key}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting(column.key)}
                >
                  {column.name}
                </ThSortable>
              ) : (
                <Th key={column.key}>{column.name}</Th>
              );
            })}
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(entities[0] ?? {}).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
