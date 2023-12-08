const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const weightSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  duration: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  weight_amount: {
    type: Number,
    required: true,
  },
  weight_type: {
    type: String,
    required: true,
  },
});

 const Weight = model('Weight', weightSchema); 


module.exports = Weight;

