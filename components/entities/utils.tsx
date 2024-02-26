import Link from 'next/link';

import { CoreEntityType } from '@prisma/client';

import {
  IconContact,
  IconCompany,
  IconProperty,
} from '@/components/common/icons';

export const getEntityLink = ({
  type,
  id,
  label,
}: {
  type?: string;
  id?: string;
  label?: string;
}) => {
  if (!type || !id) {
    return null;
  }

  let typeHref = '';
  switch (type) {
    case CoreEntityType.COMPANY:
      typeHref = '/companies';
      break;
    case CoreEntityType.CONTACT:
      typeHref = '/contacts';
      break;
    case CoreEntityType.PROPERTY:
      typeHref = '/properties';
      break;
    default:
      return null;
  }

  return <Link href={`${typeHref}/${id}`}>{label ? label : 'Go To'}</Link>;
};

export const getEntityIcon = ({
  entityType,
  className,
}: {
  entityType?: CoreEntityType;
  className?: string;
}) => {
  switch (entityType) {
    case CoreEntityType.COMPANY:
      return <IconCompany className={className} />;
    case CoreEntityType.CONTACT:
      return <IconContact className={className} />;
    case CoreEntityType.PROPERTY:
      return <IconProperty className={className} />;
    default:
      return null;
  }
};
