'use client';

import { useState } from 'react';

import { cn } from '@/libs/utils';

import { Input } from '@/components/ui/input';

import {
  EditButton,
  DeleteButton,
  ConfirmButton,
} from '@/components/controls/Buttons';

interface EditTextProps {
  label?: string | null;
  initValue?: string;
  className?: string;
  onChange?: (value?: string) => void;
}

export default function EditText({
  label,
  initValue,
  className,
  onChange,
}: EditTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tmpValue, setTmpValue] = useState<string | undefined>(initValue);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTmpValue(e.currentTarget.value);
  };

  return (
    <div className={cn('flex flex-col', className)}>
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
        <Input
          placeholder={label ?? ''}
          value={tmpValue ?? ''}
          onChange={(e) => handleChange(e)}
        />
      )}
    </div>
  );
}
