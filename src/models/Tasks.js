const mongoose = require('mongoose');

const taskSchema =  new mongoose.Schema({
  userId: {
    type: String
  },
  boardId: {
    type: String
  },
  status: {
    type: String,
    enum: ['todo', 'inProgress', 'done']
  },
  name: {
    type: String
  },
  created_at: {
    type: String
  },
  comments: {
    type: [String]
  }
});

const Task = mongoose.model('task', taskSchema);

module.exports = {
  Task
};
