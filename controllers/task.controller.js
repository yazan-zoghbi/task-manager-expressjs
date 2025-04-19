const Task = require("../models/task");
const User = require("../models/user");

const createTask = async (req, res) => {
  try {
    const { title, status, description, assignees } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Write a title for the task!",
      });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);
    const task = await Task.create({
      title,
      status,
      description,
      assignees,
      created: user.id,
    });

    res.status(201).json({ success: true, task: task });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error!",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.task.id;
    const task = await Task.findOne({ id: taskId });

    const { title, status, description, assignees } = req.body;
    await task.updateOne({ title, status, description, assignees });

    res.status(201).json({
      success: true,
      id: task.id,
      task: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error!",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.task.id;
    const task = await Task.findOne({ id: taskId });

    await Task.deleteOne({ _id: taskId });

    res.status(201).json({
      success: true,
      id: task.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error!",
    });
  }
};

module.exports = { createTask, updateTask, deleteTask };
