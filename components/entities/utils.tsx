import Link from 'next/link';

import { CoreEntityType } from '@prisma/client';

import {
  IconContact,
  IconCompany,
  IconProperty,
} from '@/components/common/icons';

export const getEntityPath = (type: CoreEntityType) => {
  switch (type) {
    case CoreEntityType.COMPANY:
      return '/companies';
    case CoreEntityType.CONTACT:
      return '/contacts';
    case CoreEntityType.PROPERTY:
      return '/properties';
    default:
      return null;
  }
};

export const getEntityLink = ({
  type,
  id,
  children,
}: {
  type?: CoreEntityType;
  id?: string;
  children?: React.ReactNode;
}) => {
  if (!type || !id) {
    return null;
  }

  return <Link href={`${getEntityPath(type)}/${id}`}>{children}</Link>;
};

export const getEntityIcon = ({
  type,
  className,
}: {
  type?: CoreEntityType;
  className?: string;
}) => {
  switch (type) {
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
