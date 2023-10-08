'use client';

import { Table } from '@mantine/core';

import { useMutation } from '@apollo/client';

import { Company } from '@/generated/resolvers-types';

import { DELETE_COMPANY } from '@/graphql/mutations';

import { EntitiesTable, ETColumn } from '../entities/EntitiesTable';

export default function CompaniesTable({
  companies,
}: {
  companies: Company[];
}) {
  const [deleteCompany, { data, loading, error }] = useMutation(DELETE_COMPANY);

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
          console.log('delete', id);

          const answerYes = confirm('Are you sure?');

          if (answerYes) {
            deleteCompany({
              variables: {
                id,
              },
            });
          }
        }}
      >
        Delete
      </button>
    );
  };

  const rowRenderer = (row: Company) => {
    const addressStr = `${row?.address?.street} ${row?.address?.city} ${row?.address?.state} ${row?.address?.zip}`;
    return (
      <Table.Tr key={row.name}>
        <Table.Td>{row.name}</Table.Td>
        <Table.Td>{addressStr}</Table.Td>
        <Table.Td>{deleteBtn(row.id)}</Table.Td>
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
