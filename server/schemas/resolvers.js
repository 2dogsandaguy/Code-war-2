const { Cardio, User, Weight, Goals } = require("../models");
const bcrypt = require("bcrypt");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      //console.log({"contextUserId":context.user._id})
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .populate({ path: "weightRoutines" })
          .populate({ path: "cardioRoutines" })
          .populate({ path: "setGoals" })
          .select("-__v -password");
        console.log("User Data:", userData);
        //console.log({ "userData queried": userData })
        //console.log({ "first weight routine": userData.weightRoutines[0] })
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
      console.log({ user, email, password });

      if (!user) {
        console.log("there is a error");
        throw new AuthenticationError();
      }
      const correctPw = await bcrypt.compare(password, user.password);
      if (!correctPw) {
        throw new Error("AuthenticationError: inccss password");
      }

      // Assuming weightRoutines is an array, make sure it's not null
      user.weightRoutines = user.weightRoutines || [];
      user.cardioRoutines = user.cardioRoutines || [];

      const token = signToken(user);
      return { token, user };
    },

    // Add resolvers for creating cardio and weights
    createCardio: async (
      _,
      { cardio_type, distance, durationType, duration, distanceType },
      context
    ) => {
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
        const deletedCardioRoutine = await Cardio.findByIdAndDelete(
          cardioRoutineId
        );
        return deletedCardioRoutine;
      } catch (error) {
        console.error("Error deleting cardio routine:", error);
        throw new Error("Error deleting cardio routine");
      }
    },
    createWeights: async (
      _,
      {
        weiDuration,
        weightDuration,
        reps,
        sets,
        weight_amount,
        weightKind,
        weight_type,
      },
      context
    ) => {
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
    setGoals: async (
      _,
      { weightLossGoal, bodyFatGoal, fastestMileGoal, personalRecordGoal },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }

      try {
        // Update the user document
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          {
            $set: {
              setGoals: {
                weightLossGoal,
                bodyFatGoal,
                fastestMileGoal,
                personalRecordGoal,
              },
            },
          },
          { new: true }
        );

        // Update the Goals collection
        const goals = await Goals.findOneAndUpdate(
          { _id: updatedUser.setGoals._id },
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
        const deletedWeightRoutine = await Weight.findByIdAndRemove(
          weightRoutineId
        );
        return deletedWeightRoutine;
      } catch (error) {
        console.error("Error deleting weight routine:", error);
        throw new Error("Error deleting weight routine");
      }
    },
  },
};

module.exports = resolvers;
