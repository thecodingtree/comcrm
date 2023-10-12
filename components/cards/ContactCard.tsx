import { Avatar, Text, Group, Card } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';

import classes from './ContactCard.module.css';

interface ContactCardProps {
  name?: string;
  email?: string;
  title?: string;
  phone?: string;
  image?: string;
}

export default function ContactCard({
  name,
  email,
  title,
  phone,
  image,
}: ContactCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md">
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
  );
}
