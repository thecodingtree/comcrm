'use client';

import { useParams } from 'next/navigation';

import { Grid } from '@mantine/core';

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
    <Grid>
      <Grid.Col span={{ base: 12, lg: 2 }}>
        <ContactAvatar
          avatarSrc={data?.image}
          onUpdated={handleAvatarImgUpdate}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 5 }}>
        <ContactInfo contactId={contactId} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 5 }}>
        <EntityNotesBrief entityId={contactId} />
      </Grid.Col>
      <Grid.Col span={12}>
        <RelationshipsTable
          fromEntityId={contactId!}
          fromEntityType={CoreEntityType.CONTACT}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <EntitiyNotesTable entity={contactId!} />
      </Grid.Col>
    </Grid>
  );
}
