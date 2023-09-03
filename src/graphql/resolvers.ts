import { Resolvers } from '../generated/resolvers-types';

const resolvers: Resolvers = {
  Query: {
    hello: () => {
      return 'world!!';
    },
  },
};

export default resolvers;
