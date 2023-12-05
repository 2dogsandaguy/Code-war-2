const {Cardio, User } = require("../models")

const createCardio = async (req, res) => {
  try {
    const cardioData = req.body;
    const cardio = await Cardio.create(cardioData);
    res.status(201).json(cardio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getCardioById = async (req, res) => {
  try {
    const cardioId = req.params.id;
    const cardio = await Cardio.findById(cardioId);
    if (!cardio) {
      return res.status(404).json({ message: 'Cardio not found' });
    }
    res.json(cardio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteCardio = async (req, res) => {
  try {
    const cardioId = req.params.id;
    const deletedCardio = await Cardio.findByIdAndDelete(cardioId);
    if (!deletedCardio) {
      return res.status(404).json({ message: 'Cardio not found' });
    }
    res.json({ message: 'Cardio deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createCardio,
  getCardioById,
  deleteCardio,
};