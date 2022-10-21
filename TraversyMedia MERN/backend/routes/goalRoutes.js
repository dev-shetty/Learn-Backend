const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

// Creating Routes
router.route("/").get(getGoals).post(setGoal);
// Put -> Update
router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
