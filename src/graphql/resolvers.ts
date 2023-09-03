import { Resolvers } from '../generated/resolvers-types';

const resolvers: Resolvers = {
  Query: {
    hello: () => 'world!',
  },
};

export default resolvers;
