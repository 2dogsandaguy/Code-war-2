const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const cardioSchema = new Schema({
  cardio_type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  distance: {
    type: Number,
    required: true,
  },
  distanceType: {
    type: String,
    required: true,
  },
  durationType:{
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const Cardio = model('Cardio', cardioSchema);


module.exports = Cardio;
