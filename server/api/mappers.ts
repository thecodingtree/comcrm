import { CoreEntityResult } from '@/server/coreEntities';
import {
  ContactType,
  CompanyType,
  PropertyType,
  TeamRole,
} from '@/server/sharedTypes';
import { SessionUser } from '@/server/sharedTypes';
import { TeamUser } from '@prisma/client';

export const canAdminEntity = (
  user?: SessionUser,
  creatorId?: string,
  teamMembers?: TeamUser[],
) => {
  // If no user is provided, then the user is not logged in and therefore cannot edit the entity
  if (!user) return false;

  return (
    user?.id === creatorId ||
    // If the user is an Admin or Owner of the team that the entity belongs to, then they can edit it
    (teamMembers
      ?.filter((member) => member.userId === user?.id)
      .some((member) => {
        return member.role === TeamRole.ADMIN || member.role === TeamRole.OWNER;
      }) ??
      false)
  );
};

export const contactDataMapper = (
  entity: CoreEntityResult,
  user?: SessionUser,
): ContactType => {
  const { id, meta, attributes, creator, createdAt, updatedAt } = entity;
  return {
    id,
    name: meta?.name!,
    surName: meta?.surName!,
    address: meta?.address,
    image: meta?.image,
    email: meta?.email,
    phone: meta?.phone,
    attributes,
    creator: creator?.email ?? '',
    createdAt,
    updatedAt,
    canAdmin: canAdminEntity(user, creator?.id, entity.team?.members),
  } as ContactType;
};

export const companyDataMapper = (
  entity: CoreEntityResult,
  user?: SessionUser,
): CompanyType => {
  const { id, meta, attributes, creator, createdAt, updatedAt } = entity;
  return {
    id,
    name: meta?.name!,
    address: meta?.address || {} || undefined,
    phone: meta?.phone || undefined,
    email: meta?.email || undefined,
    attributes,
    creator: creator?.email ?? '',
    createdAt,
    updatedAt,
    canAdmin: canAdminEntity(user, creator?.id, entity.team?.members),
  } as CompanyType;
};

export const propertyDataMapper = (
  entity: CoreEntityResult,
  user?: SessionUser,
): PropertyType => {
  const { id, meta, attributes, creator, createdAt, updatedAt } = entity;
  return {
    id,
    name: meta?.name,
    address: meta?.address,
    phone: meta?.phone,
    email: meta?.email,
    attributes,
    creator: creator?.email ?? '',
    createdAt,
    updatedAt,
    canAdmin: canAdminEntity(user, creator?.id, entity.team?.members),
  } as PropertyType;
};
