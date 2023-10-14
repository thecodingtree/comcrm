'use client';

import { Table, Text, Space } from '@mantine/core';
import Link from 'next/link';
import { Company } from '@/generated/resolvers-types';

import { EntitiesTable, ETColumn } from '../entities/EntitiesTable';

interface CompaniesTableProps {
  companies?: Company[];
  onDeleteCompany?(id: string): void;
}

export default function CompaniesTable({
  companies,
  onDeleteCompany,
}: CompaniesTableProps) {
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
          onDeleteCompany && onDeleteCompany(id);
        }}
      >
        Delete
      </button>
    );
  };

  const goToCompany = (id: string) => {
    return (
      <Link href={`/dashboard/companies/${id}`}>
        <button>Go to</button>
      </Link>
    );
  };

  const rowRenderer = (row: Company) => {
    if (row) {
      const addressStr = `${row?.address?.street} ${row?.address?.city} ${row?.address?.state} ${row?.address?.zip}`;
      return (
        <Table.Tr key={row.name}>
          <Table.Td>{row.name}</Table.Td>
          <Table.Td>{addressStr}</Table.Td>
          <Table.Td>
            <div>{deleteBtn(row.id)}</div>
            <div>{goToCompany(row.id)}</div>
          </Table.Td>
        </Table.Tr>
      );
    } else {
      return (
        <Table.Tr key="empty">
          <Table.Td colSpan={columns.length}>
            <Text ta="center">{'No Companies'}</Text>
            <Space h="lg" />
          </Table.Td>
        </Table.Tr>
      );
    }
  };

  return (
    <EntitiesTable
      entities={companies}
      columns={columns}
      rowRenderer={rowRenderer}
    />
  );
}
