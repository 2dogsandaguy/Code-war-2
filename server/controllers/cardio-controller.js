const {Cardio, User } = require("../models")

module.exports = {
    //create a new Cardio
    createCardio ({ body }, res) {
        Cardio.create(body)
         .then ((dbCardioInfo) => {
            return User.findOne(
              {id: body.userId},
              {$push: {cardio: dbCardioInfo._id}},
                
            )
         })
    }
}