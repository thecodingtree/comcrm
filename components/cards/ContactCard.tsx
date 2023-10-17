import Link from 'next/link';
import { Avatar, Text, Group, Card, rem } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';

import classes from './ContactCard.module.css';

interface ContactCardProps {
  id: string;
  name?: string;
  email?: string;
  title?: string;
  phone?: string;
  image?: string;
}

export default function ContactCard({
  id,
  name,
  email,
  title,
  phone,
  image,
}: ContactCardProps) {
  return (
    <Link href={`/dashboard/contacts/${id}`}>
      <Card w={rem(350)} shadow="sm" padding="lg" radius="md">
        <Card.Section>
          <Group wrap="nowrap">
            <Avatar src={image} size={94} radius="md" />
            <div>
              <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                {title}
              </Text>

              <Text fz="lg" fw={500} className={classes.name}>
                {name || 'No Name'}
              </Text>

              {email && (
                <Group wrap="nowrap" gap={10} mt={3}>
                  <IconAt stroke={1.5} size="1rem" className={classes.icon} />
                  <Text fz="xs" c="dimmed">
                    {email}
                  </Text>
                </Group>
              )}

              {phone && (
                <Group wrap="nowrap" gap={10} mt={5}>
                  <IconPhoneCall
                    stroke={1.5}
                    size="1rem"
                    className={classes.icon}
                  />
                  <Text fz="xs" c="dimmed">
                    {phone}
                  </Text>
                </Group>
              )}
            </div>
          </Group>
        </Card.Section>
      </Card>
    </Link>
  );
}
