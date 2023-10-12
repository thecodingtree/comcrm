import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './graphql/schema.ts',
  generates: {
    './generated/resolvers-types.ts': {
      config: {
        useIndexSignature: true,
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};
export default config;
