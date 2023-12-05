const { Weights, User } = require('../models');

const createWeights = async (req, res) => {
  try {
    const weightsData = req.body;
    const weights = await Weights.create(weightsData);
    res.status(201).json(weights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getWeightsId = async (req, res) => {
  try {
    const weightsId = req.params.id;
    const weights = await Weights.findById(weightsId);
    if (!weights) {
      return res.status(404).json({ message: 'Weights not found' });
    }
    res.json(weights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteWeights = async (req, res) => {
  try {
    const weightsId = req.params.id;
    const deletedWeights = await Weights.findByIdAndDelete(weightsId);
    if (!deletedWeights) {
      return res.status(404).json({ message: 'Weights not found' });
    }
    res.json({ message: 'Weights deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createWeights,
  getWeightsId,
  deleteWeights,
};
