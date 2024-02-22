import { z } from 'zod';

import {
  RelationshipType as PrismaRelationshipType,
  CoreEntityType,
  User,
  TaskPriority as PrismaTaskPriority,
  TaskType as PrismaTaskType,
} from '@prisma/client';

import { Session } from 'next-auth';

export const CONTACT_RESERVED_PREFIX = 'CONTACT_RESERVED_';
export const PROPERTY_RESERVED_PREFIX = 'PROPERTY_RESERVED_';
export const COMPANY_RESERVED_PREFIX = 'COMPANY_RESERVED_';

export type SessionUser = Session['user'];

export type NoteType = {
  id: string;
  creator: User;
  entityId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export const NotesFilterInput = z.object({
  entityId: z.string().optional(),
});

export type NotesFilterType = z.infer<typeof NotesFilterInput>;

export type AttributeType = {
  id?: string;
  name: string;
  value: string;
  entityId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AddressType = {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
};

export const AddressInput = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
});

export const AttributeInput = z.object({
  id: z.string().optional(),
  name: z.string(),
  value: z.string(),
});

export type ContactType = {
  id: string;
  type: CoreEntityType;
  name: string;
  surName: string;
  phone?: string;
  email?: string;
  address?: AddressType;
  image?: string;
  attributes: AttributeType[];
  creator?: string;
  createdAt: Date;
  updatedAt: Date;
  canAdmin?: boolean;
};

export const CreateContactInput = z.object({
  name: z.string(),
  surName: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  address: z.optional(AddressInput),
  attributes: z.optional(z.array(AttributeInput)),
  linkedEntity: z.optional(z.string()),
});

export type CreateContactInputType = z.infer<typeof CreateContactInput>;

export const UpdateContactInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  surName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.optional(AddressInput),
  attributes: z.optional(z.array(AttributeInput)),
  linkedEntity: z.optional(z.string()),
});

export type UpdateContactInputType = z.infer<typeof UpdateContactInput>;

export type PropertyType = {
  id: string;
  type: CoreEntityType;
  name: string;
  phone?: string;
  email?: string;
  address?: AddressType;
  attributes: AttributeType[];
  image?: string;
  creator?: string;
  createdAt: Date;
  updatedAt: Date;
  canAdmin?: boolean;
};

export const CreatePropertyInput = z.object({
  name: z.string(),
  address: z.optional(AddressInput),
  attributes: z.optional(z.array(AttributeInput)),
  linkedEntity: z.optional(z.string()),
});

export type CreatePropertyInputType = z.infer<typeof CreatePropertyInput>;

export const UpdatePropertyInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.optional(AddressInput),
  attributes: z.optional(z.array(AttributeInput)),
  linkedEntity: z.optional(z.string()),
});

export type UpdatePropertyInputType = z.infer<typeof UpdatePropertyInput>;

export type CompanyType = {
  id: string;
  type: CoreEntityType;
  name: string;
  phone?: string;
  email?: string;
  address?: AddressType;
  attributes: AttributeType[];
  image?: string;
  creator?: string;
  createdAt: Date;
  updatedAt: Date;
  canAdmin?: boolean;
};

export const CreateCompanyInput = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  address: z.optional(AddressInput),
  attributes: z.optional(z.array(AttributeInput)),
  linkedEntity: z.optional(z.string()),
});

export type CreateCompanyInputType = z.infer<typeof CreateCompanyInput>;

export const UpdateCompanyInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.optional(AddressInput),
  attributes: z.optional(z.array(AttributeInput)),
  linkedEntity: z.optional(z.string()),
});

export type UpdateCompanyInputType = z.infer<typeof UpdateCompanyInput>;

export type RelationshipType = {
  id: string;
  from: { id: string; name: string; type: string };
  to: { id: string; name: string; type: string };
  type: PrismaRelationshipType;
  createdAt: Date;
  updatedAt: Date;
};

export type RelationshipTypeEnum = PrismaRelationshipType;

export const EntityFilterInput = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  type: z.nativeEnum(CoreEntityType).optional(),
});

export type EntityFilterType = z.infer<typeof EntityFilterInput>;

export type EntitySearchResult = {
  id: string;
  name: string;
  type: CoreEntityType;
};

export enum ContactReservedAttributes {
  ALT_PHONE = `${CONTACT_RESERVED_PREFIX}ALT_PHONE`,
}

export enum PropertyReservedAttributes {
  SUITE = `${PROPERTY_RESERVED_PREFIX}SUITE`,
  SIZE = `${PROPERTY_RESERVED_PREFIX}SIZE`,
  PRICE = `${PROPERTY_RESERVED_PREFIX}PRICE`,
}

export enum CompanyReservedAttributes {
  WEBSITE = `${COMPANY_RESERVED_PREFIX}WEBSITE`,
  SIZE = `${COMPANY_RESERVED_PREFIX}SIZE`,
  ALT_PHONE = `${COMPANY_RESERVED_PREFIX}ALT_PHONE`,
  ALT_EMAIL = `${COMPANY_RESERVED_PREFIX}ALT_EMAIL`,
}

export enum TeamRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export type TeamUser = {
  id: string;
  email: string;
  name: string;
  image: string;
  role: TeamRole;
};

export type TeamInvite = {
  id: number;
  team: Team;
  token: string;
  email: string;
  role: TeamRole;
  status: 'PENDING' | 'EXPIRED';
};

export type Team = {
  id: string;
  name: string;
  slug: string;
  members: TeamUser[];
  createdAt: Date;
  updatedAt: Date;
};

export const tasksFilter = z.object({
  type: z
    .union([
      z.array(z.nativeEnum(PrismaTaskType)),
      z.nativeEnum(PrismaTaskType),
    ])
    .optional(),
  completed: z.boolean().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  entity: z.string().optional(),
  limit: z.number().optional(),
});

export type TasksFilter = z.infer<typeof tasksFilter>;

export const taskInput = z.object({
  type: z.nativeEnum(PrismaTaskType),
  description: z.string(),
  content: z.string().optional(),
  entity: z.string().optional(),
  priority: z.nativeEnum(PrismaTaskPriority).optional(),
  isPrivate: z.boolean().optional(),
  completed: z.boolean().optional(),
  startDate: z.date().optional(),
  endDate: z.date(),
});

export { PrismaTaskType as TaskType, PrismaTaskPriority as TaskPriority };

export type TaskData = z.infer<typeof taskInput>;
