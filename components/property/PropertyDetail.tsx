'use client';

import { useParams } from 'next/navigation';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { CoreEntityType } from '@prisma/client';

import PropertyInfo from './PropertyInfo';
import { RelationshipsTable } from '@/components/tables/RelationshipsTable';
import { trpc } from '@/app/_trpc/client';
import EntityNotesTable from '@/components/entities/EntityNotesTable';
import EntityUpdates from '../updates/EntityUpdates';

import { IconProperty } from '../common/icons';

export default function PropertyDetail() {
  const params = useParams();

  const propertyId = typeof params?.id === 'string' ? params?.id : undefined;

  const getProperty = trpc.property.getProperty.useQuery(propertyId);

  if (getProperty.isLoading) return <p>Loading...</p>;

  const isReadOnly = getProperty.data?.canEdit === false;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="">
          <div>
            <Avatar className="min-w-40 min-h-40">
              <AvatarImage src={getProperty?.data?.image} />
              <AvatarFallback className="w-full">
                <IconProperty size={64} />
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <PropertyInfo propertyId={propertyId} readOnly={isReadOnly} />
          </div>
        </div>
        <div className="flex-1">
          <EntityUpdates entityId={propertyId} />
        </div>
      </div>
      <div>
        <div className="">
          <RelationshipsTable
            fromEntityId={propertyId!}
            fromEntityType={CoreEntityType.PROPERTY}
            readOnly={isReadOnly}
          />
        </div>
        <div className="">
          <EntityNotesTable entity={propertyId!} />
        </div>
      </div>
    </div>
  );
}
