import { gql } from '@apollo/client';

// Define your mutation
export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      _id
      username
      // other fields 
    }
  }
`;