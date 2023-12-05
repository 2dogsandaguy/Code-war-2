const typeDefs = `
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
`