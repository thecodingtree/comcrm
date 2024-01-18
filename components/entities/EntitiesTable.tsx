'use client';

import { useState } from 'react';
import { rem, keys } from '@mantine/core';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from '@tabler/icons-react';

import { ContactType, PropertyType, CompanyType } from '@/server/sharedTypes';

import classes from './EntitiesTable.module.css';

type RowData = CompanyType | ContactType | PropertyType;

interface ThSortableProps {
  thKey?: string;
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({
  thKey,
  children,
}: {
  thKey?: string;
  children: React.ReactNode;
}) {
  return (
    <TableHead key={thKey} className={classes.th}>
      <p className="text-sm font-medium">{children}</p>
    </TableHead>
  );
}

function ThSortable({
  thKey,
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
    <Th key={thKey}>
      <Button onClick={onSort} variant="ghost" className="w-full">
        <div className=" flex flex-row w-full items-start justify-between">
          <span>{children}</span>
          <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </div>
      </Button>
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
  entities?: RowData[];
  columns: ETColumn[];
  showSearch?: boolean;
  rowRenderer(row?: RowData): React.ReactNode;
}

export function EntitiesTable({
  entities = [],
  columns,
  showSearch = false,
  rowRenderer,
}: EntitiesTableProps) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(entities || []);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };

  return (
    <ScrollArea>
      {showSearch && <div>{'Search!'}</div>}
      <Table className="m-w-[700px]">
        <TableHeader>
          <TableRow>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {entities && entities?.length
            ? entities.map((row) => rowRenderer(row))
            : rowRenderer()}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
