'use client';

import { useParams } from 'next/navigation';

import { RelationshipsTable } from '@/components/tables/RelationshipsTable';

import ContactInfo from './ContactInfo';
import ContactAvatar from './ContactAvatar';
import EntityNotesBrief from '@/components/entities/EntityNotesBrief';
import { trpc } from '@/app/_trpc/client';
import { CoreEntityType } from '@prisma/client';
import EntitiyNotesTable from '../entities/EntityNotesTable';

export default function ContactDetails() {
  const params = useParams();

  const contactId = typeof params?.id === 'string' ? params?.id : undefined;

  const { data, isLoading, refetch } =
    trpc.contact.getContact.useQuery(contactId);

  const updateAvatarImg = trpc.contact.updateAvatarSrc.useMutation({
    onSuccess: () => refetch(),
  });

  const handleAvatarImgUpdate = (res: any) => {
    updateAvatarImg.mutate({
      id: contactId!,
      avatarSrc: res[0]?.url,
    });
  };

  if (isLoading) return <p>Loading...</p>;

  const isReadOnly = data?.canEdit === false;

  return (
    <div className="grid grid-cols-3">
      <div>
        <div>
          <ContactAvatar
            avatarSrc={data?.image}
            onUpdated={handleAvatarImgUpdate}
            readOnly={data?.canEdit === false}
          />
        </div>
        <div>Owner: {data?.owner}</div>
      </div>
      <div>
        <ContactInfo contactId={contactId} readOnly={isReadOnly} />
      </div>
      <div>
        <EntityNotesBrief entityId={contactId} />
      </div>
      <div className="col-span-3">
        <RelationshipsTable
          fromEntityId={contactId!}
          fromEntityType={CoreEntityType.CONTACT}
          readOnly={isReadOnly}
        />
      </div>
      <div className="col-span-3">
        <EntitiyNotesTable entity={contactId!} />
      </div>
    </div>
  );
}
