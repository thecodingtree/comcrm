import { useState } from 'react';

import { Text, Space, TextInput, Stack, Flex, Box } from '@mantine/core';

import {
  EditButton,
  DeleteButton,
  ConfirmButton,
} from '@/components/controls/Buttons';

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
  const [street, setStreet] = useState(address?.street || '');
  const [city, setCity] = useState(address?.city || '');
  const [state, setState] = useState(address?.state || '');
  const [zip, setZip] = useState(address?.zip || '');

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
      <Flex justify="left">
        <Text size="md" c="dimmed">
          {label}
        </Text>
        <Space w="lg" />
        {!isEditing && <EditButton onClick={() => setIsEditing(!isEditing)} />}
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
            <ConfirmButton onClick={() => handleApply()} />
            <DeleteButton onClick={() => setIsEditing(!isEditing)} />
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
