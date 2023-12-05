// server/controllers/the-user-controllers.js

const { User } = require('../models');
const { signToken } = require('../utils/auth');

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await User.create(userData);
    const token = signToken(user);
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the username exists in the database
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check if the provided password matches the stored hashed password
      const validPassword = await user.isCorrectPassword(password);
  
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // If the username and password are valid, generate a token
      const token = signToken(user);
  
      // Send the token and user data in the response
      res.json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

const getSingleUser = async (req, res) => {
  try {
    // Implement your logic to retrieve a single user based on authentication
     const user = await User.findById(req.user._id);
    
   
    res.json({ message: 'Get single user route reached' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createUser, login, getSingleUser };
