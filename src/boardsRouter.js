const express = require('express');
const router = express.Router();
const {
  getBoards, addNewBoard, /*getBoardById,*/
  editBoardById, deleteBoard
} = require('./boardsService.js');

router.get('/boards', getBoards);
router.post('/boards', addNewBoard);
//router.get('/boards/:id', getBoardById);
router.put('/boards/:id', editBoardById);
router.delete('/boards/:id', deleteBoard);

module.exports = {
  boardsRouter: router
};
