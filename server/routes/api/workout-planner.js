const router = require("express").Router();

const {
  createCardio,
  getCardioById,
  deleteCardio,
} = require("../../controllers/cardio-controller");


const { authMiddleware } = require('../../utils/auth');

router.use(authMiddleware);


router.route("/cardio").post(createCardio);


router.route("/cardio/:id").get(getCardioById).delete(deleteCardio);



module.exports = router;