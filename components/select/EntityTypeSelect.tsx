import { CoreEntityType } from '@prisma/client';
import { SelectWithCustomOption } from './SelectWithCustomOption';

import {
  IconCompany,
  IconContact,
  IconProperty,
} from '@/components/common/icons';

const enityTypeItems = [
  {
    icon: <IconContact />,
    label: 'Contact',
    value: CoreEntityType.CONTACT,
  },
  {
    icon: <IconCompany />,
    label: 'Company',
    value: CoreEntityType.COMPANY,
  },
  {
    icon: <IconProperty />,
    label: 'Property',
    value: CoreEntityType.PROPERTY,
  },
];

export function EntityTypeSelect({
  placeholder,
  excludeType,
  onSelect,
}: {
  placeholder?: string;
  excludeType?: CoreEntityType;
  onSelect: (value: CoreEntityType) => void;
}) {
  return (
    <SelectWithCustomOption
      items={
        excludeType
          ? enityTypeItems.filter((item) => item.value !== excludeType)
          : enityTypeItems
      }
      placeholder={placeholder}
      onSelect={(value) => onSelect(value as CoreEntityType)}
    />
  );
}
