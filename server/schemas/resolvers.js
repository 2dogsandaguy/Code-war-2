const { Cardio, User, Weight } = require('../models');
const bcrypt = require('bcrypt');
const { signToken, AuthenticationError  } = require('../utils/auth');

const resolvers = {
  Query: {
      me: async (parent, args, context) => {
          if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
              .populate('weightRoutines','cardioRoutines') 
              .select('-__v -password')
              return userData;
          }
          throw new AuthenticationError; 
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
          console.log({user, email, password})

          if (!user) {
            console.log("there is a error")
              /* throw  AuthenticationError */
          }
          const correctPw = await bcrypt.compare(password, user.password);
          if(!correctPw) {
          
              throw new Error  ('AuthenticationError: inccss password')
          }

          // Assuming weightRoutines is an array, make sure it's not null
          user.weightRoutines = user.weightRoutines || [];  
          user.caridoRoutines = user.caridoRoutines || [];         

          const token = signToken(user);
          return { token, user };
      },

    // Add resolvers for creating cardio and weights
    createCardio: async (_, { cardio_type, distance, duration }, context) => {
      if (context.user) {
        const cardio = await Cardio.create({
          cardio_type,
          distance,
          duration,
        });
        await User.findByIdAndUpdate(context.user._id, { $push: { cardioRoutines: cardio._id } });
        return cardio;
      }
      throw  AuthenticationError; 
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
      throw  AuthenticationError; 
    },
  },
};

module.exports = resolvers;

