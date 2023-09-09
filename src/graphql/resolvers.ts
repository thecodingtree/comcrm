import prisma from '../db';
import { Resolvers, Contact } from '../generated/resolvers-types';

const resolvers: Resolvers = {
  Query: {
    allUsers: async () => {
      return await prisma.user.findMany();
    },
    contacts: async () => {
      const contacts: Contact[] = [];

      const result = await prisma.contact.findMany({
        include: { relation: { include: { companies: true } } },
      });

      result.map((contact) => {
        const contactNew: Contact = {
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          createdAt: contact.createdAt,
          updatedAt: contact.updatedAt,
          companies: [],
        };

        contact?.relation?.companies?.map((company) => {
          contactNew.companies?.push(company);
        });

        contacts.push(contactNew);
      });
      return contacts;
    },
  },
};

export default resolvers;
