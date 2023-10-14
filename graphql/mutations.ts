import { gql } from '@apollo/client';

/* ***************** COMPANY ***************** */
export const ADD_COMPANY = gql`
  mutation AddCompany(
    $user: ID!
    $name: String!
    $address: AddressInput
    $attributes: [AttributeInput]
  ) {
    createCompany(
      user: $user
      name: $name
      address: $address
      attributes: $attributes
    ) {
      id
      name
      address {
        street
        city
        state
        zip
      }
    }
  }
`;

export const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: ID!) {
    deleteCompany(id: $id) {
      id
    }
  }
`;

/* ***************** PROPERTY ***************** */
export const ADD_PROPERTY = gql`
  mutation AddProperty(
    $user: ID!
    $name: String!
    $address: AddressInput
    $attributes: [AttributeInput]
  ) {
    createProperty(
      user: $user
      name: $name
      address: $address
      attributes: $attributes
    ) {
      id
      name
      address {
        street
        city
        state
        zip
      }
    }
  }
`;

export const DELETE_PROPERTY = gql`
  mutation DeleteProperty($id: ID!) {
    deleteProperty(id: $id) {
      id
    }
  }
`;

/* ***************** CONTACT ***************** */
export const ADD_CONTACT = gql`
  mutation AddContact(
    $user: ID!
    $name: String!
    $address: AddressInput
    $attributes: [AttributeInput]
  ) {
    createContact(
      user: $user
      name: $name
      address: $address
      attributes: $attributes
    ) {
      id
      name
      address {
        street
        city
        state
        zip
      }
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(id: $id) {
      id
    }
  }
`;
