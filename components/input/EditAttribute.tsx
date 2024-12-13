import { type AttributeType } from '@/server/sharedTypes';

import EditText from '@/components/input/EditText';

interface EditAttributeProps {
  label?: string | null;
  initAttr?: AttributeType;
  reservedName?: string;
  onChange?: (value?: AttributeType) => void;
}

export default function EditAttribute({
  label,
  initAttr,
  reservedName,
  onChange,
}: EditAttributeProps) {
  const handleChange = (value?: string | null) => {
    if (onChange) {
      if (initAttr) {
        onChange({
          ...initAttr,
          value: value || '',
        });
      } else if (reservedName) {
        onChange({
          name: reservedName,
          value: value || '',
        });
      }
    }
  };

  return (
    <EditText
      label={label}
      initValue={initAttr?.value}
      onChange={handleChange}
    />
  );
}
