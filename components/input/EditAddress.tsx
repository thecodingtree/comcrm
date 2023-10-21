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

  // TODO: fix this
  const [street, setStreet] = useState(address?.street);
  const [city, setCity] = useState(address?.city);
  const [state, setState] = useState(address?.state);
  const [zip, setZip] = useState(address?.zip);

  const handleApply = () => {
    setIsEditing(!isEditing);
    const newAddress = {
      street,
      city,
      state,
      zip,
    } as Address;

    if (onChange && newAddress !== address) {
      onChange(newAddress);
    }
  };

  return (
    <Stack gap="xs">
      <Flex justify="space-between">
        <Text size="md" c="dimmed">
          {label}
        </Text>
        {!isEditing && (
          <ActionIcon
            variant="transparent"
            color="gray"
            onClick={() => setIsEditing(!isEditing)}
          >
            <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        )}
      </Flex>
      {!isEditing ? (
        <Stack gap="xs">
          <Text fs="italic">{street}</Text>
          <Text fs="italic">{`${city} ${state} ${zip}`}</Text>
        </Stack>
      ) : (
        <Stack gap="xs">
          <TextInput
            label="street"
            defaultValue={street}
            onChange={(e) => setStreet(e.currentTarget.value)}
          />
          <TextInput
            label="city"
            defaultValue={city}
            onChange={(e) => setCity(e.currentTarget.value)}
          />
          <TextInput
            label="state"
            defaultValue={state}
            onChange={(e) => setState(e.currentTarget.value)}
          />
          <TextInput
            label="zip"
            defaultValue={zip}
            onChange={(e) => setZip(e.currentTarget.value)}
          />
          <Box>
            <ActionIcon
              variant="transparent"
              color="gray"
              onClick={() => handleApply()}
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
        </Stack>
      )}
    </Stack>
  );
}
