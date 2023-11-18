'use client';

import { Table, ScrollArea, Text, Badge } from '@mantine/core';

import { RelationshipType } from '@/server/sharedTypes';

import classes from './RelationshipsTable.module.css';
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
    <Table.Th key={thKey} className={classes.th}>
      <Text fw={500} fz="sm">
        {children}
      </Text>
    </Table.Th>
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
  switch (type) {
    case RelationshipTypeEnum.OWNER_OF:
      return <Badge color="blue">Owner</Badge>;
    default:
      return <Badge color="red">Other</Badge>;
  }
};

const rowRenderer = (row: RelationshipType) => {
  const { id, type, to } = row;

  return (
    <Table.Tr key={id}>
      <Table.Td>{to.type}</Table.Td>
      <Table.Td>{to.name}</Table.Td>
      <Table.Td>{getRelationshipType(type)}</Table.Td>
      <Table.Td>Go To</Table.Td>
    </Table.Tr>
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
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Thead>
          <Table.Tr>
            {columns.map((column) => {
              return <Th key={column.key}>{column.name}</Th>;
            })}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((row) => rowRenderer(row))}
          <AddRelationship
            fromEntityId={fromEntityId}
            fromEntityType={fromEntityType}
            refetch={refetch}
          />
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
