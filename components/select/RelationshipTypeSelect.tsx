import { CoreEntityType, RelationshipType } from '@prisma/client';
import { SelectWithCustomOption } from './SelectWithCustomOption';

const getRelationshipsForTypes = (
  from: keyof typeof CoreEntityType,
  to: keyof typeof CoreEntityType
) => {
  if (from === CoreEntityType.CONTACT && to === CoreEntityType.COMPANY) {
    return [
      {
        key: RelationshipType.OWNER_OF,
        label: 'Owner Of',
      },
      {
        key: RelationshipType.EMPLOYED_BY,
        label: 'Employed By',
      },
      {
        key: RelationshipType.AGENT_FOR,
        label: 'Agent For',
      },
    ];
  } else if (from === CoreEntityType.COMPANY && to === CoreEntityType.CONTACT) {
    return [
      {
        key: RelationshipType.OWNED_BY,
        label: 'Owned By',
      },
      {
        key: RelationshipType.EMPLOYED_BY,
        label: 'Employed By',
      },
    ];
  } else if (
    from === CoreEntityType.PROPERTY &&
    to === CoreEntityType.CONTACT
  ) {
    return [
      {
        key: RelationshipType.OWNED_BY,
        label: 'Owned By',
      },
      {
        key: RelationshipType.LEASED_TO,
        label: 'Leased To',
      },
      {
        key: RelationshipType.LEASED_BY,
        label: 'Leased By',
      },
      {
        key: RelationshipType.SOLD_TO,
        label: 'Sold To',
      },
    ];
  } else if (
    from === CoreEntityType.CONTACT &&
    to === CoreEntityType.PROPERTY
  ) {
    return [
      {
        key: RelationshipType.OWNER_OF,
        label: 'Owner Of',
      },
      {
        key: RelationshipType.AGENT_FOR,
        label: 'Agent For',
      },
      {
        key: RelationshipType.INTERESTED_IN,
        label: 'Interested In',
      },
    ];
  } else if (
    from === CoreEntityType.COMPANY &&
    to === CoreEntityType.PROPERTY
  ) {
    return [
      {
        key: RelationshipType.OWNER_OF,
        label: 'Owner Of',
      },
      {
        key: RelationshipType.INTERESTED_IN,
        label: 'Interested In',
      },
      {
        key: RelationshipType.AGENT_FOR,
        label: 'Agent For',
      },
      {
        key: RelationshipType.INTERESTED_IN,
        label: 'Interested In',
      },
    ];
  } else if (
    from === CoreEntityType.PROPERTY &&
    to === CoreEntityType.COMPANY
  ) {
    return [
      {
        key: RelationshipType.OWNED_BY,
        label: 'Owned By',
      },
      {
        key: RelationshipType.LEASED_TO,
        label: 'Leased To',
      },
      {
        key: RelationshipType.LEASED_BY,
        label: 'Leased By',
      },
      {
        key: RelationshipType.SOLD_TO,
        label: 'Sold To',
      },
    ];
  }

  return [];
};

export function RelationshipTypeSelect({
  placeholder,
  disabled = false,
  fromType,
  toType,
  onSelect,
}: {
  placeholder?: string;
  disabled?: boolean;
  fromType: keyof typeof CoreEntityType;
  toType: keyof typeof CoreEntityType;
  onSelect: (value: RelationshipType) => void;
}) {
  const relationshipTypeItems = getRelationshipsForTypes(fromType, toType).map(
    (item) => ({
      value: item.key,
      label: item.label,
    })
  );

  return (
    <SelectWithCustomOption
      items={relationshipTypeItems}
      placeholder={'Relationship Type'}
      onSelect={(val) => onSelect(val as RelationshipType)}
      disabled={disabled}
    />
  );
}
