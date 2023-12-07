import { gql } from '@apollo/client';

// Query to get the current user
export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      cardioRoutines {
        _id
        cardio_type
        createdAt
        distance
      } 
      weightRoutines {
        _id
        duration
        reps
        sets
        weight_amount
        weight_type
      } 
    }
  }
`;

/*  // Query to get a list of all users
export const GET_USERS = gql`
  query Users {
    users {
      _id
      username
      cardioRoutines {
        _id
        cardio_type
        createdAt
        distance
      }
    }
  }
`;

// Query to get a specific user by username
export const GET_USER_BY_USERNAME = gql`
  query UserByUsername($username: String!) {
    user(username: $username) {
      _id
      username
      cardioRoutines {
        _id
        cardio_type
        createdAt
        distance
      }
    }
  }
`;  */




