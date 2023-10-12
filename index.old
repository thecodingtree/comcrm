import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import express from 'express';
import morgan from 'morgan';

import resolvers from './graphql/resolvers';

const typeDefs = readFileSync('./src/graphql/schema.graphql', 'utf8');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
app.use(morgan('dev'));

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  const port = Number(process.env.PORT || 4000);

  app.listen(port, '0.0.0.0', () =>
    console.log(
      `🚀  Server ready at: http://localhost:${port}${server.graphqlPath}`
    )
  );
};

startServer();
