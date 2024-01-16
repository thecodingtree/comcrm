'use client';

import Link from 'next/link';

import { ScrollArea, Text } from '@mantine/core';

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table';

import { RelationshipType } from '@/server/sharedTypes';

import {
  CoreEntityType,
  RelationshipType as RelationshipTypeEnum,
} from '@prisma/client';

import { trpc } from '@/app/_trpc/client';

import { AddRelationship } from './AddRelationship';

function Th({
  thKey,
  children,
}: {
  thKey?: string;
  children: React.ReactNode;
}) {
  return (
    <TableHead key={thKey}>
      <Text fw={500} fz="sm">
        {children}
      </Text>
    </TableHead>
  );
}

export type ETColumn = {
  name: string;
  key: string;
  sortable: boolean;
};

const columns = [
  {
    name: 'Type',
    key: 'type',
    sortable: false,
  },
  {
    name: 'Name',
    key: 'name',
    sortable: false,
  },
  {
    name: 'Relationship',
    key: 'relationship',
    sortable: true,
  },

  {
    name: 'Actions',
    key: 'actions',
    sortable: false,
  },
] as ETColumn[];

const getRelationshipType = (type: string) => {
  // TODO: Fix this
  // switch (type) {
  //   case RelationshipTypeEnum.OWNER_OF:
  //     return <Badge color="blue">Owner</Badge>;
  //   default:
  //     return <Badge color="red">Other</Badge>;
  // }

  return type;
};

const getEntityLink = ({
  entityType,
  id,
}: {
  entityType: string;
  id: string;
}) => {
  let typeHref = '';
  switch (entityType) {
    case CoreEntityType.COMPANY:
      typeHref = '/dashboard/companies';
      break;
    case CoreEntityType.CONTACT:
      typeHref = '/dashboard/contacts';
      break;
    case CoreEntityType.PROPERTY:
      typeHref = '/dashboard/properties';
      break;
  }

  return <Link href={`${typeHref}/${id}`}>Go To</Link>;
};

const rowRenderer = (row: RelationshipType) => {
  const { id, type, to } = row;

  return (
    <TableRow key={id}>
      <TableCell>{to.type}</TableCell>
      <TableCell>{to.name}</TableCell>
      <TableCell>{getRelationshipType(type)}</TableCell>
      <TableCell>{getEntityLink({ entityType: to.type, id: to.id })}</TableCell>
    </TableRow>
  );
};

export function RelationshipsTable({
  fromEntityId,
  fromEntityType,
}: {
  fromEntityId: string;
  fromEntityType: CoreEntityType;
}) {
  const { data, refetch } =
    trpc.relationship.getRelationshipsForEntity.useQuery({
      entityId: fromEntityId!,
      limit: 10,
    });

  return (
    <ScrollArea>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              return <Th key={column.key}>{column.name}</Th>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row) => rowRenderer(row))}
          <AddRelationship
            fromEntityId={fromEntityId}
            fromEntityType={fromEntityType}
            refetch={refetch}
          />
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
