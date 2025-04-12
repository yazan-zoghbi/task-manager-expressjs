const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

router.post("/task/create", createTask);
router.put("/task/update/?id", updateTask);
router.delete("/task/delete/?id", deleteTask);

module.exports = router;
