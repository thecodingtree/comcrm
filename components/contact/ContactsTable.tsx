'use client';

import { Avatar } from '@mantine/core';

import { TableRow, TableCell } from '@/components/ui/table';
import Link from 'next/link';
import { ContactType } from '@/server/sharedTypes';

import { EntitiesTable, ETColumn } from '../entities/EntitiesTable';

interface ContactsTableProps {
  contacts?: ContactType[];
  onDeleteContact?(id: string): void;
}

export default function ContactsTable({
  contacts,
  onDeleteContact,
}: ContactsTableProps) {
  const columns = [
    { name: '', key: 'avatar', sortable: false },

    {
      name: 'First Name',
      key: 'name',
      sortable: true,
    },
    {
      name: 'Last Name',
      key: 'surName',
      sortable: true,
    },
    {
      name: 'Phone',
      key: 'phone',
      sortable: true,
    },
    {
      name: 'Email',
      key: 'email',
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
          onDeleteContact && onDeleteContact(id);
        }}
      >
        Delete
      </button>
    );
  };

  const goToContact = (id: string) => {
    return (
      <Link href={`/dashboard/contacts/${id}`}>
        <button>Go to</button>
      </Link>
    );
  };

  const rowRenderer = (row: ContactType) => {
    if (row) {
      const addressStr = `${row?.address?.street || ''} ${
        row?.address?.city || ''
      } ${row?.address?.state || ''} ${row?.address?.zip || ''}`;
      return (
        <TableRow key={row.id}>
          <TableCell>
            <Avatar color="gray" radius="xl" size={50} src={row.image} />
          </TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.surName}</TableCell>
          <TableCell>{row.phone}</TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell>{addressStr}</TableCell>
          <TableCell>
            <div>{deleteBtn(row.id)}</div>
            <div>{goToContact(row.id)}</div>
          </TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow key="empty">
          <TableCell colSpan={columns.length}>
            <p className="text-center">No Contacts</p>
            <div className="min-h-4" />
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <EntitiesTable
      entities={contacts}
      columns={columns}
      rowRenderer={rowRenderer}
    />
  );
}
