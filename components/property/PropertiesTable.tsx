'use client';

import { Space } from '@mantine/core';
import { TableRow, TableCell } from '@/components/ui/table';
import Link from 'next/link';

import { PropertyReservedAttributes, PropertyType } from '@/server/sharedTypes';

import { EntitiesTable, ETColumn } from '@/components/entities/EntitiesTable';

interface PropertiesTableProps {
  properties?: PropertyType[];
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
      name: 'Size',
      key: 'size',
      sortable: false,
    },
    {
      name: 'Price',
      key: 'price',
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

  const rowRenderer = (row: PropertyType) => {
    if (row) {
      const addressStr =
        row?.address &&
        `${row?.address?.street || ''} ${row?.address?.city || ''} ${
          row?.address?.state || ''
        } ${row?.address?.zip || ''}`;
      const size = row?.attributes?.find(
        (attr) => attr.name === PropertyReservedAttributes.SIZE
      )?.value;
      const sizeStr = size ? `${size} sqft` : '';
      const price = row?.attributes?.find(
        (attr) => attr.name === PropertyReservedAttributes.PRICE
      )?.value;
      const priceStr = price ? `$${price}` : '';
      return (
        <TableRow key={row.id}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{addressStr}</TableCell>
          <TableCell>{sizeStr}</TableCell>
          <TableCell>{priceStr}</TableCell>
          <TableCell>
            <div>{deleteBtn(row.id)}</div>
            <div>{goToProperty(row.id)}</div>
          </TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow key="empty">
          <TableCell colSpan={columns.length}>
            <p className="text-center">No Properties</p>
            <Space h="lg" />
          </TableCell>
        </TableRow>
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
