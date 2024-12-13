'use client';

import { TableRow, TableCell } from '@/components/ui/table';

import Link from 'next/link';

import { CompanyReservedAttributes, type CompanyType } from '@/server/sharedTypes';

import { EntitiesTable, type ETColumn } from '../entities/EntitiesTable';

interface CompaniesTableProps {
  companies?: CompanyType[];
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
      name: 'Size',
      key: 'size',
      sortable: false,
    },
    {
      name: 'Website',
      key: 'website',
      sortable: false,
    },
    {
      name: 'Phone',
      key: 'phone',
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
      <Link href={`/companies/${id}`}>
        <button>Go to</button>
      </Link>
    );
  };

  const rowRenderer = (row: CompanyType) => {
    if (row) {
      const addressStr = `${row?.address?.street} ${row?.address?.city} ${row?.address?.state} ${row?.address?.zip}`;
      const website = row?.attributes?.find(
        (attr) => attr.name === CompanyReservedAttributes.WEBSITE,
      )?.value;
      const size = row?.attributes?.find(
        (attr) => attr.name === CompanyReservedAttributes.SIZE,
      )?.value;
      return (
        <TableRow key={row.name}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{size}</TableCell>
          <TableCell>{website}</TableCell>
          <TableCell>{row.phone}</TableCell>
          <TableCell>
            <div>{row.canAdmin && deleteBtn(row.id)}</div>
            <div>{goToCompany(row.id)}</div>
          </TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow key="empty">
          <TableCell colSpan={columns.length}>
            <p className="text-center">No Companies</p>
            <div className="min-h-4" />
          </TableCell>
        </TableRow>
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
