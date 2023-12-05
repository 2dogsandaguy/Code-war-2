const { Cardio, User, Weight, Workout } = require('../models');
const { signToken, authMiddleware } = require('../utils/auth');

const resolvers = {
  Query: {
    // Add a resolver to get the current user based on the token
    me: async (_, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('cardioRoutines');
        return user;
      }
      throw new Error('You are not logged in.');
    },
  },
  Mutation: {
    // Add a resolver for user login
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error('Incorrect username or password');
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new Error('Incorrect username or password');
      }

      const token = signToken(user);

      return { token, user };
    },

    // Add resolvers for creating cardio and weights
    createCardio: async (_, { cardio_type, distance }, context) => {
      if (context.user) {
        const cardio = await Cardio.create({
          cardio_type,
          distance,
        });
        await User.findByIdAndUpdate(context.user._id, { $push: { cardioRoutines: cardio._id } });
        return cardio;
      }
      throw new Error('You must be logged in to perform this action.');
    },
    createWeights: async (_, { duration, reps, sets, weight_amount, weight_type }, context) => {
      if (context.user) {
        const weight = await Weight.create({
          duration,
          reps,
          sets,
          weight_amount,
          weight_type,
        });
        await User.findByIdAndUpdate(context.user._id, { $push: { weightRoutines: weight._id } });
        return weight;
      }
      throw new Error('You must be logged in to perform this action.');
    },
  },
};

module.exports = resolvers;
