const express = require('express');
const router = express.Router();
const {
  getTasks, addNewTask, getTaskById,
  editTaskById, deleteTask
} = require('./tasksService.js');

router.get('/tasks', getTasks);
router.post('/tasks', addNewTask);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', editTaskById);
router.delete('/tasks/:id', deleteTask);

module.exports = {
  tasksRouter: router
};
