'use client';

import { Table } from '@mantine/core';

import { EntitiesTable, ETColumn } from '../entities/EntitiesTable';

export default function CompaniesTable({
  companies,
}: {
  companies: Company[];
}) {
  if (companies.length === 0) return <div>No companies</div>;

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
  ] as ETColumn[];

  const rowRenderer = (row: Company) => {
    const addressStr = `${row?.address?.street} ${row?.address?.city} ${row?.address?.state} ${row?.address?.zip}`;
    return (
      <Table.Tr key={row.name}>
        <Table.Td>{row.name}</Table.Td>
        <Table.Td>{addressStr}</Table.Td>
      </Table.Tr>
    );
  };

  return (
    <EntitiesTable
      entities={companies}
      columns={columns}
      rowRenderer={rowRenderer}
    />
  );
}
