const router = require("express").Router();
const userRoutes = require("./the-user");
const exerciseRoutes = require("./workout-planner");

router.use("/user", userRoutes);
router.use("/planner", exerciseRoutes);

module.exports = router;