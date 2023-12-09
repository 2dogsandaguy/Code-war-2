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
    createCardio(cardio_type: String!, distance: Int!): Cardio
    createWeights(
      duration: Int!, 
      reps: Int!, 
      sets: Int!, 
      weight_amount: Int!, 
      weight_type: String!
      ): Weight
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
    createdAt: String
    distance: Int

  }
  
  type Weight {
    _id: ID
    duration: Int
    reps: Int
    sets: Int
    weight_amount: Int
    weight_type: String
  }
  type PersonalRecords {
    maxWeight: Int
    longestRun: Int
  }
  

  
  `
module.exports = typeDefs;

