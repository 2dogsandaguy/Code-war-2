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
        distanceType
        createdAt
        distance
        durationType
      } 
      weightRoutines {
        _id
        duration
        reps
        sets
        weight_amount
        weight_type
      } 
      personalRecords {
        maxWeight
        longestRun
      }
      streak 
    }  
  }
`;
// Query to get the User data for the profile page
export const GET_USER_DATA = gql`
  query GetUserData {
    user {
      _id
      username
      email
    
      personalRecords {
        maxWeight
        longestRun
      }
      streak 
    }
  }
`;


export const VIEW_HISTORY = gql`
  query ViewHistory {
    me {
      cardioRoutines {
        _id
        cardio_type
        distanceType
        createdAt
        distance
        durationType
        duration
      }
      weightRoutines {
        _id
        duration
        createdAt
        reps
        sets
        weight_amount
        weight_type
      }
    }
  }
`;


