import { useState } from 'react';

import { TextInput } from '@mantine/core';

import { IconPencil, IconCheck, IconX } from '@tabler/icons-react';

import {
  EditButton,
  DeleteButton,
  ConfirmButton,
} from '@/components/controls/Buttons';

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
          <EditButton onClick={() => setIsEditing(!isEditing)} />
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
            <ConfirmButton
              onClick={() => {
                setIsEditing(!isEditing);

                if (onChange && tmpValue !== initValue) {
                  onChange(tmpValue);
                }
              }}
            />

            <DeleteButton onClick={() => setIsEditing(!isEditing)} />
          </div>
        )}
      </div>
    </div>
  );
}
