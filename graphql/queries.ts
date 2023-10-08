import { gql } from '@apollo/client';

export const GET_COMPANIES_FOR_USER = gql`
  query GetCompaniesForUser($user: ID!) {
    companies(filter: { user: $user }) {
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
