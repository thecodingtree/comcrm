'use client';

import { Table } from '@mantine/core';

import { useMutation } from '@apollo/client';

import { Company, Property, Contact } from '@/generated/resolvers-types';

import { DELETE_COMPANY } from '@/graphql/mutations';

import { EntitiesTable, ETColumn } from '../entities/EntitiesTable';

import Link from 'next/link';

export default function LinkedEntitiesTable({
  linkedEntities,
}: {
  linkedEntities: Contact[] | Company[] | Property[];
}) {
  const [deleteCompany, { data, loading, error }] = useMutation(DELETE_COMPANY);

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

  // const deleteBtn = (id: string) => {
  //   return (
  //     <button
  //       onClick={() => {
  //         console.log('delete', id);

  //         const answerYes = confirm('Are you sure?');

  //         if (answerYes) {
  //           deleteCompany({
  //             variables: {
  //               id,
  //             },
  //           });
  //         }
  //       }}
  //     >
  //       Delete
  //     </button>
  //   );
  // };

  // const goTo = (id: string) => {
  //   return (
  //     <Link href={`/dashboard/companies/${id}`}>
  //       <button>Go to</button>
  //     </Link>
  //   );
  // };

  const rowRenderer = (row: Company) => {
    const addressStr = `${row?.address?.street} ${row?.address?.city} ${row?.address?.state} ${row?.address?.zip}`;
    return (
      <Table.Tr key={row.name}>
        <Table.Td>{row.name}</Table.Td>
        <Table.Td>{addressStr}</Table.Td>
        <Table.Td>
          Actions
          {/* <div>{deleteBtn(row.id)}</div>
          <div>{goToCompany(row.id)}</div> */}
        </Table.Td>
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
