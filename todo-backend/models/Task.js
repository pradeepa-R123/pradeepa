const mongoose = require('mongoose');

// Define schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: true
  }
});

// Create and export model
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
