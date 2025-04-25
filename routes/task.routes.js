const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTasksByUserID,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const { verifyAuth } = require("../middlewares/auth.middleware");

router.get("/all", verifyAuth, getTasks);
router.get("/all/user", verifyAuth, getTasksByUserID);
router.post("/create", verifyAuth, createTask);
router.put("/update/:id", verifyAuth, updateTask);
router.delete("/delete/:id", verifyAuth, deleteTask);

module.exports = router;
