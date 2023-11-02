'use client';

import { Table, Text, Space } from '@mantine/core';
import Link from 'next/link';
import { Contact } from '@/generated/resolvers-types';

import { EntitiesTable, ETColumn } from '../entities/EntitiesTable';

interface ContactsTableProps {
  contacts?: Contact[];
  onDeleteContact?(id: string): void;
}

export default function ContactsTable({
  contacts,
  onDeleteContact,
}: ContactsTableProps) {
  const columns = [
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

  const rowRenderer = (row: Contact) => {
    if (row) {
      const addressStr = `${row?.address?.street || ''} ${
        row?.address?.city || ''
      } ${row?.address?.state || ''} ${row?.address?.zip || ''}`;
      return (
        <Table.Tr key={row.name}>
          <Table.Td>{row.name}</Table.Td>
          <Table.Td>{row.surName}</Table.Td>
          <Table.Td>{row.email}</Table.Td>
          <Table.Td>{row.phone}</Table.Td>
          <Table.Td>{addressStr}</Table.Td>
          <Table.Td>
            <div>{deleteBtn(row.id)}</div>
            <div>{goToContact(row.id)}</div>
          </Table.Td>
        </Table.Tr>
      );
    } else {
      return (
        <Table.Tr key="empty">
          <Table.Td colSpan={columns.length}>
            <Text ta="center">{'No Contacts'}</Text>
            <Space h="lg" />
          </Table.Td>
        </Table.Tr>
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
