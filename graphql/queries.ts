import { gql } from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

import { CoreEntityFilter, Company } from '@/generated/resolvers-types';

/** ***************** CONTACTS ************************** */

/** ***************** COMPANIES ************************** */
export const GET_COMPANIES: TypedDocumentNode<
  { companies: Company[] },
  { filter: CoreEntityFilter }
> = gql`
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

/** ***************** PROPERTIES ************************** */
