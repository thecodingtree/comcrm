import prisma from '../db';
import { Resolvers } from '../generated/resolvers-types';

const resolvers: Resolvers = {
  Query: {
    allUsers: async () => {
      return await prisma.user.findMany();
    },
  },
};

export default resolvers;
