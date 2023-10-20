import { useState, useRef } from 'react';

import { Stack, Flex, Text, ActionIcon, TextInput, Box } from '@mantine/core';

import { IconPencil, IconCheck, IconX } from '@tabler/icons-react';

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

                if (onChange && tmpValue !== initValue) {
                  onChange(tmpValue);
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
        <Text fs="italic">{tmpValue}</Text>
      ) : (
        <TextInput value={tmpValue ?? ''} onChange={(e) => handleChange(e)} />
      )}
    </Stack>
  );
}
