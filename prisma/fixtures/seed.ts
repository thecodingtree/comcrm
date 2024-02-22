import { CoreEntityType, PrismaClient, TeamRole } from '@prisma/client';

import { createCoreEntity } from './coreEntity';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'dmitchek+test@gmail.com' },
    update: {},
    create: {
      email: 'dmitchek+test@gmail.com',
      name: 'David Mitchell',
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: 'dmitchek+test2@gmail.com' },
    update: {},
    create: {
      email: 'dmitchek+test2@gmail.com',
      name: 'David Testerson',
    },
  });
  const user3 = await prisma.user.upsert({
    where: { email: 'dmitchek+test3@gmail.com' },
    update: {},
    create: {
      email: 'dmitchek+test3@gmail.com',
      name: 'Steve Testerson',
    },
  });
  console.log({ user1, user2, user3 });

  // ************ TEAMs ************
  // Create TEAM with user1 as owner
  const team1 = await prisma.team.upsert({
    where: { slug: 'team-1' },
    create: {
      name: 'Team 1',
      slug: 'team-1',
      members: {
        create: [
          {
            userId: user1.id!,
            role: TeamRole.OWNER,
          },
          {
            userId: user2.id!,
            role: TeamRole.ADMIN,
          },
          {
            userId: user3.id!,
            role: TeamRole.MEMBER,
          },
        ],
      },
    },
    update: {},
  });

  console.log({ team1 });

  // ************ Core Entities ************
  // Create Core Entities for user1
  const coreEntityContact = await createCoreEntity({
    db: prisma,
    type: CoreEntityType.CONTACT,
    creatorId: user1.id,
    teamId: team1.id!,
    name: 'Test',
    surName: 'Contact',
  });

  const coreEntityCompany = await createCoreEntity({
    db: prisma,
    type: CoreEntityType.COMPANY,
    creatorId: user1.id!,
    teamId: team1.id!,
    name: 'Test Company',
  });

  const coreEntityProperty = await createCoreEntity({
    db: prisma,
    type: CoreEntityType.PROPERTY,
    creatorId: user1.id!,
    teamId: team1.id!,
    name: 'Test Property',
  });

  console.log({ coreEntityContact, coreEntityCompany, coreEntityProperty });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
