const express = require('express');
const router = express.Router();
const {
  getBoards, addNewBoard, getBoardById,
  editBoardName, updateNumberOfTasks, deleteBoard
} = require('./boardsService.js');

router.get('/boards', getBoards);
router.post('/boards', addNewBoard);
router.get('/boards/:id', getBoardById);
router.put('/boards/:id', editBoardName);
router.delete('/boards/:id', deleteBoard);
router.put('/boards/:id/post', updateNumberOfTasks);

module.exports = {
  boardsRouter: router
};
