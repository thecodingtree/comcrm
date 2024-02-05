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

  return (
    <div className="grid grid-cols-3">
      <div>
        <div>
          <ContactAvatar
            avatarSrc={data?.image}
            onUpdated={handleAvatarImgUpdate}
          />
        </div>
        <div>Owner: {data?.owner}</div>
      </div>
      <div>
        <ContactInfo contactId={contactId} />
      </div>
      <div>
        <EntityNotesBrief entityId={contactId} />
      </div>
      <div className="col-span-3">
        <RelationshipsTable
          fromEntityId={contactId!}
          fromEntityType={CoreEntityType.CONTACT}
        />
      </div>
      <div className="col-span-3">
        <EntitiyNotesTable entity={contactId!} />
      </div>
    </div>
  );
}
