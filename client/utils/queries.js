import { gql } from '@apollo/client';

// Define your query
export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      username
      // other fields 
    }
  }
`;


