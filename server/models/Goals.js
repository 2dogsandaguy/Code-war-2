const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const bcrypt = require('bcrypt');
const goalsSchema = new Schema({
  weightLossGoal: {
    type: String,
  },
  bodyFatGoal: {
    type: String,
  },
  fastestMileGoal: {
    type: String,
  },
  personalRecordGoal: {
    type: String,
  },
});

const Goals = model('Goals', goalsSchema);

module.exports = Goals;
