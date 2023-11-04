'use client';

import { useParams } from 'next/navigation';

import { Flex, Box, Space } from '@mantine/core';

import { trpc } from '@/app/_trpc/client';

import { ContactType } from '@/server/sharedTypes';

import ContactCard from '@/components/cards/ContactCard';
import ContactAdd from '@/components/contact/ContactAdd';

export default function CompanyContacts() {
  const params = useParams();
  const entityId = params?.id as string;

  const { data, isLoading, refetch } = trpc.contact.getContacts.useQuery({
    filter: { id: entityId },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box>
      <Flex
        mih={50}
        gap="lg"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        {data?.map((contact: ContactType) => {
          const contact_title =
            contact?.attributes?.find((attr) => attr?.name === 'COMPANY_TITLE')
              ?.value || '';

          return (
            <ContactCard
              key={`contact-${contact.id}`}
              id={contact.id}
              name={`${contact.name} ${contact.surName}`}
              title={contact_title}
              email={contact.email || ''}
              phone={contact.phone || ''}
              image={contact.image || ''}
            />
          );
        })}
      </Flex>
      <Space h="lg" />
      <ContactAdd linkedEntity={entityId} onAdded={refetch} />
    </Box>
  );
}
