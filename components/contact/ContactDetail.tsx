'use client';

import { useParams } from 'next/navigation';

import { RelationshipsTable } from '@/components/tables/RelationshipsTable';

import ContactInfo from './ContactInfo';
import ContactAvatar from './ContactAvatar';

import { trpc } from '@/app/_trpc/client';
import { CoreEntityType } from '@prisma/client';
import EntitiyNotesTable from '../entities/EntityNotesTable';
import EntityUpdates from '../updates/EntityUpdates';

export default function ContactDetails() {
  const params = useParams();

  const contactId = typeof params?.id === 'string' ? params?.id : undefined;

  const { data, isLoading, refetch } =
    trpc.contact.getContact.useQuery(contactId);

  const updateAvatarImg = trpc.contact.updateAvatarSrc.useMutation({
    onSuccess: () => refetch(),
  });

  const createNote = trpc.notes.createNote.useMutation({
    //onSettled: () => getNotesForEntity?.refetch(),
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
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="">
          <div>
            <ContactAvatar
              avatarSrc={data?.image}
              onUpdated={handleAvatarImgUpdate}
              readOnly={data?.canEdit === false}
            />
          </div>
          <div>
            <ContactInfo contactId={contactId} readOnly={isReadOnly} />
          </div>
        </div>
        <div className="flex-1">
          <EntityUpdates entityId={contactId} />
        </div>
      </div>

      <div>
        <div className="">
          <RelationshipsTable
            fromEntityId={contactId!}
            fromEntityType={CoreEntityType.CONTACT}
            readOnly={isReadOnly}
          />
        </div>
        <div className="">
          <EntitiyNotesTable entity={contactId!} />
        </div>
      </div>
    </div>
  );
}
