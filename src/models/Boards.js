const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: {
    type: String
  },
  userId: {
    type: String
  },
  created_at: {
    type: Date
  },
  creationDate: {
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
