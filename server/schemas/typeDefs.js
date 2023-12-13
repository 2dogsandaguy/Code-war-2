const typeDefs = `
  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  type Auth {
    token: ID!
    user: User
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createCardio(cardio_type: String!, distanceType: String!,
                distance: Int!, durationType: String!,
                duration: Int!): Cardio
                deleteCardioRoutine(cardioRoutineId: ID!): Cardio
    createWeights(weiDuration: Int,
                  weightDuration: String, 
                  reps: Int!, 
                  sets: Int!, 
                  weight_amount: Int!, 
                  weight_type: String!,
                  weightKind: String 
                  ): Weight
                  deleteWeightRoutine(weightRoutineId: ID!): Weight 
  }
  

  type User {
    _id: ID
    username: String
    email: String
    cardioRoutines: [Cardio]
    weightRoutines: [Weight]
    personalRecords: PersonalRecords
    streak: Int 
  }


  type Cardio {
    _id: ID
    cardio_type: String
    distanceType: String
    createdAt: String
    distance: Int
    durationType: String
    duration: Int
  }
  
  type Weight {
    _id: ID
    weiDuration: Int
    weightDuration: String
    createdAt: String
    reps: Int
    sets: Int
    weight_amount: Int
    weight_type: String
    weightKind: String
  }
  type PersonalRecords {
    maxWeight: Int
    longestRun: Int
  }
  

  
  `
module.exports = typeDefs;

