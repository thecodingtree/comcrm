import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { getServerSession } from 'next-auth';

import resolvers from '../../../graphql/resolvers';
import { GraphQLSchema } from '../../../graphql/schema';

import { User, PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';

import { authOptions } from '../auth/[...nextauth]/options';

import prisma from '@/db';

const typeDefs = GraphQLSchema;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

interface Context {
  user: User;
}

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async ({ cookies }: NextApiRequest) => {
    const session = await getServerSession(authOptions);

    const userEmail = session?.user?.email;
    if (userEmail) {
      const user = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      return { user };
    }

    return { user: null };
  },
});

export { handler as GET, handler as POST };
