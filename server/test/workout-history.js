const { Cardio, User, Weight } = require('../models');
//const bcrypt = require('bcrypt');
//const { signToken, AuthenticationError  } = require('../utils/auth');

const db = require('../config/connection');

db.once("open", async()=>{

    let me = async (parent, args, context) => {
            //console.log({"contextUserId":context.user._id})
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .populate({path:'weightRoutines'}) 
                .populate({path:'caridoRoutines'}) 
                .select('-__v -password')
                
                console.log({"userData queried":userData})
                console.log({"first weight routine":userData.weightRoutines[0]})
                return userData;
            }
            //throw new AuthenticationError; 
    }

    const context = {
        user: {
            _id: "657672106aa4a9a5eec138c3"
        }
    }
    var response = me({}, {}, context)

})
