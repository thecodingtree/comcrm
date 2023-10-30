import { gql } from '@apollo/client';

/* ***************** COMPANY ***************** */
export const EDIT_COMPANY = gql`
  mutation EditCompany(
    $id: ID!
    $name: String
    $phone: String
    $email: String
    $address: AddressInput
    $attributes: [AttributeInput]
  ) {
    updateCompany(
      id: $id
      name: $name
      phone: $phone
      email: $email
      address: $address
      attributes: $attributes
    ) {
      id
      name
      phone
      email
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
export const EDIT_PROPERTY = gql`
  mutation EditProperty(
    $id: ID!
    $name: String
    $phone: String
    $email: String
    $address: AddressInput
    $attributes: [AttributeInput]
  ) {
    updateProperty(
      id: $id
      name: $name
      phone: $phone
      email: $email
      address: $address
      attributes: $attributes
    ) {
      id
      name
      phone
      email
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
export const EDIT_CONTACT = gql`
  mutation EditContact(
    $id: ID!
    $name: String
    $surName: String
    $phone: String
    $email: String
    $address: AddressInput
    $attributes: [AttributeInput]
  ) {
    updateContact(
      id: $id
      name: $name
      surName: $surName
      phone: $phone
      email: $email
      address: $address
      attributes: $attributes
    ) {
      id
      name
      surName
      phone
      email
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
