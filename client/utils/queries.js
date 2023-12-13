import { gql } from "@apollo/client";

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
        weiDuration
        weightDuration
        reps
        sets
        weight_amount
        weight_type
        weightKind
      }
      setGoals {
        weightLossGoal
        bodyFatGoal
        fastestMileGoal
        personalRecordGoal
      }
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
        weiDuration
        weightDuration
        createdAt
        reps
        sets
        weight_amount
        weight_type
        weightKind
      }
      setGoals {
        weightLossGoal
        bodyFatGoal
        fastestMileGoal
        personalRecordGoal
      }
    }
  }
`;
