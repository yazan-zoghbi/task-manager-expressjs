const express = require("express");
const router = express.Router();

const {
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const { verifyAuth } = require("../middlewares/auth.middleware");

router.post("/create", verifyAuth, createTask);
router.put("/update/?id", updateTask);
router.delete("/delete/?id", deleteTask);

module.exports = router;
