import { gql } from '@apollo/client';

 // User login mutation
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        cardioRoutines {
          _id
          cardio_type
          createdAt
          distance
        }
      }
    }
  }
`;

// User sign-up mutation
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        cardioRoutines {
          _id
          cardio_type
          createdAt
          distance
        }
      }
    }
  }
`;

// Cardio creation mutation
export const CREATE_CARDIO = gql`
  mutation CreateCardio($cardio_type: String!, $distance: Int!) {
    createCardio(cardio_type: $cardio_type, distance: $distance) {
      _id
      cardio_type
      createdAt
      distance
    }
  }
`;

// Weights creation mutation
export const CREATE_WEIGHTS = gql`
  mutation CreateWeights(
    $duration: Int!
    $reps: Int!
    $sets: Int!
    $weight_amount: Int!
    $weight_type: String!
  ) {
    createWeights(
      duration: $duration
      reps: $reps
      sets: $sets
      weight_amount: $weight_amount
      weight_type: $weight_type
    ) {
      _id
      duration
      reps
      sets
      weight_amount
      weight_type
    }
  }
`; 
