const { Cardio, User, Weight } = require('../models');

const { signToken, AuthenticationError  } = require('../utils/auth');

const resolvers = {
  Query: {
      me: async (parent, args, context) => {
          if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
              .select('-__v -password')
              return userData;
          }
          throw  AuthenticationError;
      }
  },
  Mutation: {
      addUser: async (_, args) => {
          const user = await User.create(args);
          const token = signToken(user);

          return { token, user };
      },
      login: async (_, { email, password }) => {
          const user = await User.findOne( { email });
          if (!user) {
              throw  AuthenticationError
          }
          const correctPw = await user.isCorrectPassword(password);
          if(!correctPw) {
              throw  AuthenticationError
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

