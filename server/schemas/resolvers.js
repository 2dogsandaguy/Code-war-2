const { Cardio, User, Weight, Workout } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {},
    Mutation: {},
};

module.exports = resolvers;