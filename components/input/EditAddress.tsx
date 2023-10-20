import { useState } from 'react';

import { Text, TextInput, Stack, Flex, ActionIcon, Box } from '@mantine/core';
import { IconPencil, IconCheck, IconX } from '@tabler/icons-react';

import { Address, Maybe } from '@/generated/resolvers-types';

interface EditAddressProps {
  label?: string | null;
  address: Maybe<Address>;
  onChange?: (value: Maybe<Address>) => void;
}

export default function EditAddress({
  label,
  address,
  onChange,
}: EditAddressProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tmpAddress, setTmpAddress] = useState<Address | null>(address);

  const handleChange = (name: string, e: React.FormEvent<HTMLInputElement>) => {
    const newAddress = {
      ...address,
      [name]: e.currentTarget.value,
    } as Address;
    setTmpAddress(newAddress);
  };

  return (
    <Stack gap="xs">
      <Flex justify="space-between">
        <Text size="md" c="dimmed">
          {label}
        </Text>
        {!isEditing ? (
          <ActionIcon
            variant="transparent"
            color="gray"
            onClick={() => setIsEditing(!isEditing)}
          >
            <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        ) : (
          <Box>
            <ActionIcon
              variant="transparent"
              color="gray"
              onClick={() => {
                setIsEditing(!isEditing);

                if (onChange && tmpAddress !== address) {
                  onChange(tmpAddress);
                }
              }}
            >
              <IconCheck style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              variant="transparent"
              color="gray"
              onClick={() => setIsEditing(!isEditing)}
            >
              <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Box>
        )}
      </Flex>
      {!isEditing ? (
        <Stack gap="xs">
          <Text fs="italic">{tmpAddress?.street}</Text>
          <Text fs="italic">{`${tmpAddress?.city} ${tmpAddress?.state}, ${tmpAddress?.zip}`}</Text>
        </Stack>
      ) : (
        <Stack gap="xs">
          <TextInput
            label="street"
            defaultValue={tmpAddress?.street}
            onChange={(e) => handleChange('street', e)}
          />
          <TextInput
            label="city"
            defaultValue={tmpAddress?.city}
            onChange={(e) => handleChange('city', e)}
          />
          <TextInput
            label="state"
            defaultValue={tmpAddress?.state}
            onChange={(e) => handleChange('state', e)}
          />
          <TextInput
            label="zip"
            defaultValue={tmpAddress?.zip}
            onChange={(e) => handleChange('zip', e)}
          />
        </Stack>
      )}
    </Stack>
  );
}
