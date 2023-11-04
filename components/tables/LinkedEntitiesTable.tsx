'use client';

import { Table } from '@mantine/core';

import { ContactType, PropertyType, CompanyType } from '@/server/sharedTypes';

import { EntitiesTable, ETColumn } from '../entities/EntitiesTable';

export default function LinkedEntitiesTable({
  linkedEntities,
}: {
  linkedEntities: CompanyType[] | ContactType[] | PropertyType[];
}) {
  if (linkedEntities.length === 0) return <div>Nothing to display</div>;

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

  const rowRenderer = (row: CompanyType | PropertyType) => {
    const addressStr = `${row?.address?.street} ${row?.address?.city} ${row?.address?.state} ${row?.address?.zip}`;
    return (
      <Table.Tr key={row.name}>
        <Table.Td>{row.name}</Table.Td>
        <Table.Td>{addressStr}</Table.Td>
        <Table.Td>Actions</Table.Td>
      </Table.Tr>
    );
  };

  return (
    <EntitiesTable
      entities={linkedEntities}
      columns={columns}
      rowRenderer={rowRenderer}
      showSearch={false}
    />
  );
}
