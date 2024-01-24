'use client';

import { useParams } from 'next/navigation';

import { CoreEntityType } from '@prisma/client';

import { trpc } from '@/app/_trpc/client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import CompanyInfo from './CompanyInfo';
import EntityNotesBrief from '@/components/entities/EntityNotesBrief';
import { RelationshipsTable } from '@/components/tables/RelationshipsTable';
import EntitiyNotesTable from '../entities/EntityNotesTable';
import { IconCompany } from '../common/icons';

export default function CompanyDetails() {
  const params = useParams();

  const companyId = typeof params?.id === 'string' ? params?.id : undefined;

  const { data, isLoading } = trpc.company.getCompany.useQuery(companyId);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3">
      <div>
        <Avatar className="min-w-40 min-h-40">
          <AvatarImage src={data?.image} />
          <AvatarFallback className="w-full">
            <IconCompany size={64} />
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <CompanyInfo companyId={companyId} />
      </div>
      <div>
        <EntityNotesBrief entityId={companyId} />
      </div>
      <div className="col-span-3">
        <RelationshipsTable
          fromEntityId={companyId!}
          fromEntityType={CoreEntityType.COMPANY}
        />
      </div>
      <div className="col-span-3">
        <EntitiyNotesTable entity={companyId!} />
      </div>
    </div>
  );
}
