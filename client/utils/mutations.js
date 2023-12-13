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
          distanceType
          createdAt
          distance
          duration
          durationType
        }
      }
    }
  }
`;


export const SET_GOALS = gql`
  mutation setGoals(
    $weightLossGoal: String
    $bodyFatGoal: String
    $fastestMileGoal: String
    $personalRecordGoal: String
  ) {
    setGoals(
      weightLossGoal: $weightLossGoal
      bodyFatGoal: $bodyFatGoal
      fastestMileGoal: $fastestMileGoal
      personalRecordGoal: $personalRecordGoal
    ) {
      _id
      weightLossGoal
      bodyFatGoal
      fastestMileGoal
      personalRecordGoal
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        
      }
    }
  }
`;

// Cardio creation mutation
export const CREATE_CARDIO = gql`
  mutation CreateCardio($cardio_type: String!, $distanceType: String!,
                          $distance: Int!, $durationType: String!, $duration: Int!) {
    createCardio(cardio_type: $cardio_type, distanceType: $distanceType, 
                  distance: $distance, durationType: $durationType, duration: $duration) {
      _id
      cardio_type
      distanceType
      createdAt
      distance
      durationType
    }
  }
`;

export const DELETE_CARDIO = gql`
  mutation DeleteCardio($cardioRoutineId: ID!) {
    deleteCardioRoutine(cardioRoutineId: $cardioRoutineId) {
      _id
    }
  }
`;

// Weights creation mutation
export const CREATE_WEIGHTS = gql`
  mutation CreateWeights(
    $weiDuration: Int,
    $weightDuration: String,
    $reps: Int!,
    $sets: Int!,
    $weight_amount: Int!,
    $weightKind: String!,
    $weight_type: String!,
  ) {
    createWeights(
      weiDuration: $weiDuration,
      weightDuration: $weightDuration,
      reps: $reps,
      sets: $sets,
      weight_amount: $weight_amount,
      weight_type: $weight_type,
      weightKind: $weightKind,
    ) {
      _id
      weiDuration
      weightDuration
      createdAt
      reps
      sets
      weight_amount
      weight_type
      weightKind
    }
  }
`; 

export const DELETE_WEIGHT = gql`
mutation DeleteWeight ($weightRoutineId: ID!){
  deleteWeightRoutine(weightRoutineId: $weightRoutineId){
    _id
  }
}
`;
