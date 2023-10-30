import { useState } from 'react';

import { Stack, Space, Flex, Text, TextInput, Box } from '@mantine/core';

import {
  EditButton,
  DeleteButton,
  ConfirmButton,
} from '@/components/controls/Buttons';

interface EditTextProps {
  label?: string | null;
  initValue?: string | null;
  onChange?: (value?: string | null) => void;
}

export default function EditText({
  label,
  initValue,
  onChange,
}: EditTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tmpValue, setTmpValue] = useState(initValue);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTmpValue(e.currentTarget.value);
  };

  return (
    <Stack gap="xs">
      <Flex justify="left">
        <Text size="md" c="dimmed">
          {label}
        </Text>
        <Space w="lg" />
        {!isEditing ? (
          <EditButton onClick={() => setIsEditing(!isEditing)} />
        ) : (
          <Box>
            <ConfirmButton
              onClick={() => {
                setIsEditing(!isEditing);

                if (onChange && tmpValue !== initValue) {
                  onChange(tmpValue);
                }
              }}
            />
            <DeleteButton onClick={() => setIsEditing(!isEditing)} />
          </Box>
        )}
      </Flex>
      {!isEditing ? (
        <Text fs="italic">{tmpValue ?? 'No Value'}</Text>
      ) : (
        <TextInput
          placeholder={label ?? ''}
          value={tmpValue ?? ''}
          onChange={(e) => handleChange(e)}
        />
      )}
    </Stack>
  );
}
