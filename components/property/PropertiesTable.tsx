'use client';

import { TableRow, TableCell } from '@/components/ui/table';
import Link from 'next/link';

import { PropertyReservedAttributes, PropertyType } from '@/server/sharedTypes';

import { EntitiesTable, ETColumn } from '@/components/entities/EntitiesTable';

export default function PropertiesTable({
  properties,
  onDeleteProperty,
}: {
  properties?: PropertyType[];
  onDeleteProperty?(id: string): void;
}) {
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
      <Link href={`/properties/${id}`}>
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
        (attr) => attr.name === PropertyReservedAttributes.SIZE,
      )?.value;
      const sizeStr = size ? `${size} sqft` : '';
      const price = row?.attributes?.find(
        (attr) => attr.name === PropertyReservedAttributes.PRICE,
      )?.value;
      const priceStr = price ? `$${price}` : '';
      return (
        <TableRow key={row.id}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{addressStr}</TableCell>
          <TableCell>{sizeStr}</TableCell>
          <TableCell>{priceStr}</TableCell>
          <TableCell>
            <div>{row.canAdmin && deleteBtn(row.id)}</div>
            <div>{goToProperty(row.id)}</div>
          </TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow key="empty">
          <TableCell colSpan={columns.length}>
            <p className="text-center">No Properties</p>
            <div className="min-h-4" />
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
