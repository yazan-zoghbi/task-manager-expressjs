const Task = require("../models/task");
const User = require("../models/user");

const getTasks = async (req, res) => {
  try {
    let { page = 1, limit = 5 } = req.query;

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page)) page = 1;
    if (isNaN(limit)) limit = 5;

    page = Math.max(page, 1);
    limit = Math.min(Math.max(limit, 1), 100);

    const filter = { created: req.user.id };

    if (typeof status === "string" && status.trim() !== "") {
      filter.status = status.trim();
    }

    console.log({ page, limit, status });


    const total = await Task.countDocuments(filter);
    const pages = Math.ceil(total / limit) || 1;

    if (page > pages) page = pages;

    const tasks = await Task.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    if (!tasks) {
      return res.status(404).json({
        success: false,
        message: "Tasks not found!",
      });
    }

    res.status(200).json({
      success: true,
      meta: { total, page, pages, limit },
      tasks: tasks,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

const getTasksByUserID = async (req, res) => {
  try {
    const userID = req.user.id;
    const tasks = await Task.find({ created: userID });

    res.status(200).json({
      success: true,
      tasks: tasks,
    });
  } catch (error) {
    console.error(error.message);
  }
};

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
    const taskId = req.params.id;

    const { title, status, description, assignees } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title: title,
        status: status,
        description: description,
        assignees: assignees,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });
    }

    res.status(200).json({
      success: true,
      task: updatedTask,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Server error!",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findByIdAndDelete(
      { _id: taskId },
      { new: true, runValidators: true }
    );

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });
    }

    res.status(200).json({
      success: true,
      task: deletedTask,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Server error!",
    });
  }
};

module.exports = {
  getTasks,
  getTasksByUserID,
  createTask,
  updateTask,
  deleteTask,
};
