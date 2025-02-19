'use client';

import { useParams } from 'next/navigation';

import RelationshipsList from '@/components/relationship/RelationshipsList';

import ContactInfo from './ContactInfo';
import EditAvatar from '../input/EditAvatar';

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

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="">
          <div>
            <EditAvatar
              src={data?.image}
              onUpdated={handleAvatarImgUpdate}
              readOnly={false}
            />
          </div>
          <div>
            <ContactInfo contactId={contactId} readOnly={false} />
          </div>
        </div>
        <div className="flex-1">
          <EntityUpdates entityId={contactId} />
        </div>
      </div>

      <div>
        <div className="">
          <RelationshipsList
            fromId={contactId!}
            fromType={CoreEntityType.CONTACT}
          />
        </div>
        <div className="">
          <EntitiyNotesTable entity={contactId!} />
        </div>
      </div>
    </div>
  );
}
