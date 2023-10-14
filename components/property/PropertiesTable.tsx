'use client';

import { Table, Text, Space } from '@mantine/core';
import Link from 'next/link';

import { Property } from '@/generated/resolvers-types';

import { EntitiesTable, ETColumn } from '@/components/entities/EntitiesTable';

interface PropertiesTableProps {
  properties?: Property[];
  onDeleteProperty?(id: string): void;
}

export default function PropertiesTable({
  properties,
  onDeleteProperty,
}: PropertiesTableProps) {
  const columns = [
    {
      name: 'Name',
      key: 'name',
      sortable: true,
    },
    {
      name: 'Address',
      key: 'address',
      sortable: false,
    },
    {
      name: 'Actions',
      key: 'actions',
      sortable: false,
    },
  ] as ETColumn[];

  const deleteBtn = (id: string) => {
    return (
      <button
        onClick={() => {
          onDeleteProperty && onDeleteProperty(id);
        }}
      >
        Delete
      </button>
    );
  };

  const goToProperty = (id: string) => {
    return (
      <Link href={`/dashboard/properties/${id}`}>
        <button>Go to</button>
      </Link>
    );
  };

  const rowRenderer = (row: Property) => {
    if (row) {
      const addressStr = `${row?.address?.street} ${row?.address?.city} ${row?.address?.state} ${row?.address?.zip}`;
      return (
        <Table.Tr key={row.name}>
          <Table.Td>{row.name}</Table.Td>
          <Table.Td>{addressStr}</Table.Td>
          <Table.Td>
            <div>{deleteBtn(row.id)}</div>
            <div>{goToProperty(row.id)}</div>
          </Table.Td>
        </Table.Tr>
      );
    } else {
      return (
        <Table.Tr key="empty">
          <Table.Td colSpan={columns.length}>
            <Text ta="center">{'No Properties'}</Text>
            <Space h="lg" />
          </Table.Td>
        </Table.Tr>
      );
    }
  };

  return (
    <EntitiesTable
      entities={properties}
      columns={columns}
      rowRenderer={rowRenderer}
    />
  );
}
