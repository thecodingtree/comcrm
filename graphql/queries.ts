import { gql } from '@apollo/client';

/** ***************** CONTACTS ************************** */
export const GET_CONTACTS = gql`
  query GetContacts($filter: CoreEntityFilter) {
    contacts(filter: $filter) {
      id
      name
      surName
      image
      email
      phone
      address {
        street
        city
        state
        zip
      }
      attributes {
        name
        value
      }
    }
  }
`;

export const GET_CONTACT = gql`
  query GetContact($id: ID!) {
    contact(id: $id) {
      id
      name
      surName
      image
      email
      phone
      address {
        street
        city
        state
        zip
      }
      attributes {
        name
        value
      }
    }
  }
`;

/** ***************** COMPANIES ************************** */
export const GET_COMPANIES = gql`
  query GetCompanies($filter: CoreEntityFilter) {
    companies(filter: $filter) {
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

export const GET_COMPANY = gql`
  query GetCompany($id: ID!) {
    company(id: $id) {
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

/** ***************** PROPERTIES ************************** */
export const GET_PROPERTIES = gql`
  query GetProperties($filter: CoreEntityFilter) {
    properties(filter: $filter) {
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

export const GET_PROPERTY = gql`
  query GetProperty($id: ID!) {
    property(id: $id) {
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
