import { gql } from '@apollo/client';

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
