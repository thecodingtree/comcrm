import { Address } from '@/generated/resolvers-types';
import { Group, Box, Grid, Avatar, Title, Text, Space } from '@mantine/core';

interface PropertyInfoProps {
  name?: string;
  address?: Address;
}

const generateAvatarText = (name: string) => {
  const split = name.split(' ');
  if (split.length === 1) {
    return split[0].charAt(0);
  } else {
    return `${split[0].charAt(0).toUpperCase()}${split[1]
      .charAt(0)
      .toUpperCase()}`;
  }
};

export default function PropertyInfo({ name, address }: PropertyInfoProps) {
  const address_2 = `${address?.city} ${address?.state}, ${address?.zip}`;
  return (
    <Group>
      <Avatar color="blue" radius="xl" size={150}>
        {name && generateAvatarText(name)}
      </Avatar>
      <Box>
        <Title order={1}>{name ? name : 'No Name Provided'}</Title>
        <Space h="xs" />
        <div className="mt-4">
          {address ? (
            <>
              <Text>{address?.street}</Text>
              <Text>{address_2}</Text>
            </>
          ) : (
            <Text>
              <i>No Address Provided</i>
            </Text>
          )}
        </div>
      </Box>
    </Group>
  );
}
