import { gql } from 'graphql-tag';

export const GraphQLSchema = gql`
  scalar DateTime
  scalar JSON

  input CoreEntityFilter {
    entity: ID
  }

  input AddressInput {
    street: String!
    city: String!
    state: String!
    zip: String!
  }

  input AttributeInput {
    name: String!
    value: String!
  }

  input CoreEntityInput {
    name: String!
    surName: String
    address: AddressInput
    attributes: [AttributeInput]
    user: ID
  }

  type Query {
    me: User

    companies(filter: CoreEntityFilter): [Company]
    company(id: ID!): Company
  }

  type Mutation {
    #createUser(name: String, email: String!): User
    updateCompany(
      id: ID!
      name: String
      phone: String
      email: String
      address: AddressInput
      attributes: [AttributeInput]
    ): Company
    deleteCompany(id: ID!): Company
  }

  type User {
    id: ID!
    name: String
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Core Entities

  type Company {
    id: ID!
    name: String!
    phone: String
    email: String
    address: Address
    attributes: [Attribute]
    user: User
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Metadata
  type Address {
    id: ID!
    street: String!
    city: String!
    state: String!
    zip: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Attribute {
    name: String!
    value: String!
  }
`;
