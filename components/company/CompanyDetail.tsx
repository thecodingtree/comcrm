'use client';

import { useParams } from 'next/navigation';

import { CoreEntityType } from '@prisma/client';

import { trpc } from '@/app/_trpc/client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import CompanyInfo from './CompanyInfo';
import EntityUpdates from '../updates/EntityUpdates';
import { RelationshipsTable } from '@/components/tables/RelationshipsTable';
import EntitiyNotesTable from '../entities/EntityNotesTable';
import { IconCompany } from '../common/icons';

export default function CompanyDetails() {
  const params = useParams();

  const companyId = typeof params?.id === 'string' ? params?.id : undefined;

  const { data, isLoading } = trpc.company.getCompany.useQuery(companyId);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div>
          <div>
            <Avatar className="min-w-40 min-h-40">
              <AvatarImage src={data?.image} />
              <AvatarFallback className="w-full">
                <IconCompany size={64} />
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <CompanyInfo companyId={companyId} readOnly={false} />
          </div>
        </div>
        <div className="flex-1">
          <EntityUpdates entityId={companyId} />
        </div>
      </div>
      <div>
        <div className="">
          <RelationshipsTable
            fromEntityId={companyId!}
            fromEntityType={CoreEntityType.COMPANY}
            readOnly={false}
          />
        </div>
        <div className="">
          <EntitiyNotesTable entity={companyId!} />
        </div>
      </div>
    </div>
  );
}
