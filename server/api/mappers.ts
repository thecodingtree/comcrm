import { CoreEntityResult } from '@/server/coreEntities';
import {
  ContactType,
  CompanyType,
  PropertyType,
  TeamRole,
} from '@/server/sharedTypes';
import { SessionUser } from '@/server/sharedTypes';
import { TeamUser } from '@prisma/client';

export const canEditEntity = (
  user?: SessionUser,
  ownerId?: string,
  teamMembers?: TeamUser[],
) => {
  // If no user is provided, then the user is not logged in and therefore cannot edit the entity
  if (!user) return false;

  return (
    // If the user is the owner of the entity, then they can edit it
    user?.id === ownerId ||
    // If the user is an admin of the team that the entity belongs to, then they can edit it
    teamMembers?.some(
      (member) => member.userId === user?.id && member.role === TeamRole.ADMIN,
    ) ||
    false
  );
};

export const contactDataMapper = (
  entity: CoreEntityResult,
  user?: SessionUser,
): ContactType => {
  const { id, meta, attributes, owner, createdAt, updatedAt } = entity;
  return {
    id,
    name: meta?.name!,
    surName: meta?.surName!,
    address: meta?.address,
    image: meta?.image,
    email: meta?.email,
    phone: meta?.phone,
    attributes,
    owner: owner?.email ?? '',
    createdAt,
    updatedAt,
    canEdit: canEditEntity(user, owner?.id, entity.team?.members),
    isOwner: user?.id === owner?.id,
  } as ContactType;
};

export const companyDataMapper = (
  entity: CoreEntityResult,
  user?: SessionUser,
): CompanyType => {
  const { id, meta, attributes, owner, team, createdAt, updatedAt } = entity;
  return {
    id,
    name: meta?.name!,
    address: meta?.address || {} || undefined,
    phone: meta?.phone || undefined,
    email: meta?.email || undefined,
    attributes,
    owner: owner?.email ?? '',
    createdAt,
    updatedAt,
    canEdit: canEditEntity(user, owner?.id, entity.team?.members),
    isOwner: user?.id === owner?.id,
  } as CompanyType;
};

export const propertyDataMapper = (
  entity: CoreEntityResult,
  user?: SessionUser,
): PropertyType => {
  const { id, meta, attributes, owner, createdAt, updatedAt } = entity;
  return {
    id,
    name: meta?.name,
    address: meta?.address,
    phone: meta?.phone,
    email: meta?.email,
    attributes,
    owner: owner?.email ?? '',
    createdAt,
    updatedAt,
    canEdit: canEditEntity(user, owner?.id, entity.team?.members),
    isOwner: user?.id === owner?.id,
  } as PropertyType;
};
