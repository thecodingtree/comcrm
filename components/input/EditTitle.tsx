import { useState } from 'react';

import { Stack, Flex, ActionIcon, TextInput, Box } from '@mantine/core';

import { IconPencil, IconCheck, IconX } from '@tabler/icons-react';

interface EditTitleProps {
  initValue?: string | null;
  onChange?: (value?: string | null) => void;
}

export default function EditText({ initValue, onChange }: EditTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tmpValue, setTmpValue] = useState(initValue);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTmpValue(e.currentTarget.value);
  };

  return (
    <Stack gap="xs">
      {!isEditing ? (
        <Flex>
          <h1 className="italic">{tmpValue ?? 'No Value'}</h1>
          <ActionIcon
            m={8}
            variant="transparent"
            color="gray"
            onClick={() => setIsEditing(!isEditing)}
          >
            <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Flex>
      ) : (
        <TextInput
          placeholder="name"
          value={tmpValue ?? ''}
          onChange={(e) => handleChange(e)}
        />
      )}
      <Flex justify="space-between">
        {isEditing && (
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
    </Stack>
  );
}
