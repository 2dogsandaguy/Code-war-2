const { Cardio, User, Weight, Goals } = require("../models");
const bcrypt = require("bcrypt");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .populate({ path: "weightRoutines" })
          .populate({ path: "cardioRoutines" })
          .populate({ path: "setGoals" })
          .select("-__v -password");
        console.log("User Data:", userData);
        return userData;
      }
      throw new AuthenticationError();
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError();
      }
      const correctPw = await bcrypt.compare(password, user.password);
      if (!correctPw) {
        throw new Error("AuthenticationError: incorrect password");
      }
      user.weightRoutines = user.weightRoutines || [];
      user.cardioRoutines = user.cardioRoutines || [];
      const token = signToken(user);
      return { token, user };
    },
    createCardio: async (_, { cardio_type, distance, durationType, duration, distanceType }, context) => {
      if (context.user) {
        const cardio = await Cardio.create({
          cardio_type,
          distanceType,
          distance,
          duration,
          durationType,
        });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { cardioRoutines: cardio._id },
        });
        return cardio;
      }
      throw AuthenticationError;
    },
    deleteCardioRoutine: async (_, { cardioRoutineId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }
      try {
        const deletedCardioRoutine = await Cardio.findByIdAndDelete(cardioRoutineId);
        return deletedCardioRoutine;
      } catch (error) {
        console.error("Error deleting cardio routine:", error);
        throw new Error("Error deleting cardio routine");
      }
    },
    createWeights: async (_, { weiDuration, weightDuration, reps, sets, weight_amount, weightKind, weight_type }, context) => {
      if (context.user) {
        const weight = await Weight.create({
          weiDuration,
          weightDuration,
          reps,
          sets,
          weight_amount,
          weight_type,
          weightKind,
        });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { weightRoutines: weight._id },
        });
        return weight;
      }
      throw AuthenticationError;
    },
    setGoals: async (_, { weightLossGoal, bodyFatGoal, fastestMileGoal, personalRecordGoal }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }
    
      try {
        let updatedUser = await User.findById(context.user._id).populate("setGoals");
    
        // If setGoals is null, create a new Goals document
        if (!updatedUser.setGoals) {
          const goals = await Goals.create({
            weightLossGoal,
            bodyFatGoal,
            fastestMileGoal,
            personalRecordGoal,
          });
    
          // Update the user with the new Goals document ID
          updatedUser.setGoals = goals._id;
          await updatedUser.save();
        } else {
          // If setGoals exists, update the corresponding Goals document
          await Goals.findByIdAndUpdate(
            updatedUser.setGoals,
            {
              $set: {
                weightLossGoal,
                bodyFatGoal,
                fastestMileGoal,
                personalRecordGoal,
              },
            },
            { new: true }
          );
        }
    
        // Populate the setGoals field and return the user
        updatedUser = await User.findById(updatedUser._id).populate("setGoals");
        return updatedUser;
      } catch (error) {
        console.error("Error setting goals:", error);
        throw new Error("Error setting goals");
      }
    },
    
    

    deleteWeightRoutine: async (_, { weightRoutineId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }
      try {
        const deletedWeightRoutine = await Weight.findByIdAndRemove(weightRoutineId);
        return deletedWeightRoutine;
      } catch (error) {
        console.error("Error deleting weight routine:", error);
        throw new Error("Error deleting weight routine");
      }
    },
  },
};

module.exports = resolvers;
