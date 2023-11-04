'use client';

import { useParams } from 'next/navigation';

import { Box, Flex, Space } from '@mantine/core';

import { ContactType } from '@/server/sharedTypes';

import ContactCard from '@/components/cards/ContactCard';
import ContactAdd from '@/components/contact/ContactAdd';

export default function CompanyContacts() {
  const params = useParams();
  const entityId = params?.id as string;

  // const { data, loading, error } = useQuery(GET_CONTACTS, {
  //   variables: {
  //     filter: { entity: params?.id as string },
  //   },
  // });

  const data: ContactType[] = [];
  const isLoading = false;

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
              id={contact.id}
              key={`contact-${contact.id}`}
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
      <ContactAdd linkedEntity={entityId} />
    </Box>
  );
}
