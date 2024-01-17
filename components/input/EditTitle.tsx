import { useState } from 'react';

import { ActionIcon, TextInput } from '@mantine/core';

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
    <div className="flex flex-col gap-1">
      {!isEditing ? (
        <div className="flex flex-row">
          <h1 className="italic">{tmpValue ?? 'No Value'}</h1>
          <ActionIcon
            m={8}
            variant="transparent"
            color="gray"
            onClick={() => setIsEditing(!isEditing)}
          >
            <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </div>
      ) : (
        <TextInput
          placeholder="name"
          value={tmpValue ?? ''}
          onChange={(e) => handleChange(e)}
        />
      )}
      <div className="flex justify-between">
        {isEditing && (
          <div>
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
          </div>
        )}
      </div>
    </div>
  );
}
