const router = require("express").Router();

const {
    createWeights,
    getWeightsId,
    deleteWeights
} = require("../../controllers/weights-controllers");
const {
  createCardio,
  getCardioById,
  deleteCardio,
} = require("../../controllers/cardio-controller.js");


const { authMiddleware } = require('../../utils/auth');

router.use(authMiddleware);


router.route("/cardio").post(createCardio);


router.route("/cardio/:id").get(getCardioById).delete(deleteCardio);


router.route("/weights").post(createWeights);


router.route("/weights/id").get(getWeightsId).delete(deleteWeights);


module.exports = router;