import { useState } from 'react';

import { Space, TextInput, Flex, Box } from '@mantine/core';

import {
  EditButton,
  DeleteButton,
  ConfirmButton,
} from '@/components/controls/Buttons';

import { AddressType } from '@/server/sharedTypes';

interface EditAddressProps {
  label?: string | null;
  address?: AddressType;
  onChange?: (value?: AddressType) => void;
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
    } as AddressType;

    if (onChange && newAddress !== address) {
      onChange(newAddress);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Flex justify="left">
        <p className="text-base text-slate-400">{label}</p>
        <Space w="lg" />
        {!isEditing && <EditButton onClick={() => setIsEditing(!isEditing)} />}
      </Flex>
      {!isEditing ? (
        <div className="flex flex-col gap-1">
          <p className="italic">{street}</p>
          <p className="italic">{`${city} ${state} ${zip}`}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
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
        </div>
      )}
    </div>
  );
}
