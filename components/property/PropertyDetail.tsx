'use client';

import { useParams } from 'next/navigation';

import { Avatar } from '@mantine/core';

import { CoreEntityType } from '@prisma/client';

import { IconBuilding } from '@tabler/icons-react';

import PropertyInfo from './PropertyInfo';
import EntityNotesBrief from '@/components/entities/EntityNotesBrief';
import { RelationshipsTable } from '@/components/tables/RelationshipsTable';
import { trpc } from '@/app/_trpc/client';
import EntityNotesTable from '@/components/entities/EntityNotesTable';

export default function PropertyDetail() {
  const params = useParams();

  const propertyId = typeof params?.id === 'string' ? params?.id : undefined;

  const getProperty = trpc.property.getProperty.useQuery(propertyId);

  if (getProperty.isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3">
      <div>
        <Avatar
          color="blue"
          radius="xl"
          size={150}
          src={getProperty.data?.image}
        >
          <IconBuilding size={75} />
        </Avatar>
      </div>
      <div>
        <PropertyInfo propertyId={propertyId} />
      </div>
      <div>
        <EntityNotesBrief entityId={propertyId} />
      </div>
      <div className="col-span-3">
        <RelationshipsTable
          fromEntityId={propertyId!}
          fromEntityType={CoreEntityType.PROPERTY}
        />
      </div>
      <div className="col-span-3">
        <EntityNotesTable entity={propertyId!} />
      </div>
    </div>
  );
}
