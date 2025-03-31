const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  status: {
    type: String,
    enum: ["to_do", "in_progress", "done"],
    required: true,
  },
  description: { type: String },
  assignees: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  updated: { type: Date, default: Date.now() },
  created: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Task", TaskSchema);
