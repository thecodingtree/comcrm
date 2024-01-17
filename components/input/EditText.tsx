import { useState } from 'react';

import { TextInput } from '@mantine/core';

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
    <div className="flex flex-col gap-1">
      <div className="flex justify-start gap-4">
        <p className="text-base text-slate-400">{label}</p>
        {!isEditing ? (
          <EditButton onClick={() => setIsEditing(!isEditing)} />
        ) : (
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
      {!isEditing ? (
        <p className="italic">{tmpValue ?? 'No Value'}</p>
      ) : (
        <TextInput
          placeholder={label ?? ''}
          value={tmpValue ?? ''}
          onChange={(e) => handleChange(e)}
        />
      )}
    </div>
  );
}
