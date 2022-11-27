const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: {
    type: String
  },
  boardId: {
    type: String
  },
  created_at: {
    type: Date
  },
  creationDate: {
    type: String
  },
  created_by: {
    type: String
  },
  description: {
    type: String
  },
  numberOfTasks: {
    type: Number
  }
});

const Board = mongoose.model('board', boardSchema);

module.exports = {
  Board
};
