'use client';

import { TableRow, TableCell } from '@/components/ui/table';

import { type ContactType, type PropertyType, type CompanyType } from '@/server/sharedTypes';

import { EntitiesTable, type ETColumn } from '../entities/EntitiesTable';

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
      <TableRow key={row.name}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{addressStr}</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
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
