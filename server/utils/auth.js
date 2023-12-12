const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
require('dotenv').config();

// set token secret and expiration date
const secret = process.env.JWT_SECRET || 'defaultSecret';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  // function for our authenticated routes
  authMiddleware: function ({ req, res  }) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization || req.body.token;
    
/* console.log({query:req.query.token,headers:req.headers,body:req.body}) */


    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    console.log('Received token:', token);
    if (!token) {
      console.log('No token found.');
      return { user: req.user };

    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      console.log('User data:', data);
    } catch (err){
      console.error(err.message);
      return res.status(400).json({ message: 'invalid token!' });
    }

    // send to next endpoint
    return { user: req.user, res }; 

  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};