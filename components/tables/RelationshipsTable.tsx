'use client';

import { ScrollArea } from '@/components/ui/scroll-area';

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table';

import {
  RelationshipTypeResult,
  RelationshipResult,
} from '@/server/relationship';

import { CoreEntityType } from '@prisma/client';

import { trpc } from '@/app/_trpc/client';

import { AddRelationship } from './AddRelationship';

import { getEntityLink } from '@/components/entities/utils';

function Th({
  thKey,
  children,
}: {
  thKey?: string;
  children: React.ReactNode;
}) {
  return (
    <TableHead key={thKey}>
      <p className="text-sm font-medium">{children}</p>
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

const rowRenderer = (row: RelationshipResult) => {
  return (
    <TableRow key={row.id}>
      <TableCell>{row.from.type}</TableCell>
      <TableCell>{row.to.meta?.name}</TableCell>
      <TableCell>{row.type.name}</TableCell>
      <TableCell>
        {getEntityLink({ type: row.to.type, id: row.to.id })}
      </TableCell>
    </TableRow>
  );
};

export function RelationshipsTable({
  fromEntityId,
  fromEntityType,
  readOnly,
}: {
  fromEntityId: string;
  fromEntityType: CoreEntityType;
  readOnly?: boolean;
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
          {!readOnly && (
            <AddRelationship
              fromEntityId={fromEntityId}
              fromEntityType={fromEntityType}
              refetch={refetch}
            />
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
