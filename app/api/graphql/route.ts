import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import resolvers from '../../../graphql/resolvers';
import { GraphQLSchema } from '../../../graphql/schema';

const typeDefs = GraphQLSchema;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(apolloServer);

export { handler as POST };
