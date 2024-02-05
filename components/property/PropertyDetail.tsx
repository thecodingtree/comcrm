'use client';

import { useParams } from 'next/navigation';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { CoreEntityType } from '@prisma/client';

import { IconBuilding } from '@tabler/icons-react';

import PropertyInfo from './PropertyInfo';
import EntityNotesBrief from '@/components/entities/EntityNotesBrief';
import { RelationshipsTable } from '@/components/tables/RelationshipsTable';
import { trpc } from '@/app/_trpc/client';
import EntityNotesTable from '@/components/entities/EntityNotesTable';
import { IconProperty } from '../common/icons';

export default function PropertyDetail() {
  const params = useParams();

  const propertyId = typeof params?.id === 'string' ? params?.id : undefined;

  const getProperty = trpc.property.getProperty.useQuery(propertyId);

  if (getProperty.isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3">
      <div>
        <div>
          <Avatar className="min-w-40 min-h-40">
            <AvatarImage src={getProperty?.data?.image} />
            <AvatarFallback className="w-full">
              <IconProperty size={64} />
            </AvatarFallback>
          </Avatar>
        </div>
        <div>Owner: {getProperty?.data?.owner}</div>
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
