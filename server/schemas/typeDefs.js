const typeDefs = `

  type Query {
    me: User
  }
  type Mutation {
    login(username: String!, password: String!): AuthPayload
    createCardio(cardio_type: String!, distance: Int!): Cardio
    createWeights(duration: Int!, reps: Int!, sets: Int!, weight_amount: Int!, weight_type: String!): Weight
  }
  
  type User {
    _id: ID
    username: String
    password: String
    cardioRoutines: [Cardio]!
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
  
  type AuthPayload {
    token: String
    user: User
  }
`
module.exports = typeDefs;