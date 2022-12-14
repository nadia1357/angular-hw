const { Task } = require('./models/Tasks.js');
const { Board } = require('./models/Tasks.js');
const jwt = require('jsonwebtoken');

const authJWT = (auth) => {
  if (!auth) {
    return res.status(401).json({ 'message': 'Please, provide authorization header' });
  }
  const [, token] = auth.split(' ');
  if (!token) {
    return res.status(401).json({ 'message': 'Please, include token to request' });
  }

  try {
    const tokenPayload = jwt.verify(token, 'secret-jwt-key');
    return tokenPayload;
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
}

const getTasks = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = authJWT(authorization);
  const board = await Board.find({ userId: user.userId });
  if (board) {
    await Task.find({ userId: user.userId, boardId: board._id })
      .then((result) => {
        return res.status(200).json({ 'tasks': result });
      })
      .catch(err => next(err));
  } else {
    return res.status(400).json({ message: 'Board not found' });
  }
}

const addNewTask = async (req, res, next) => {
  const newTaskInfo = req.body.payload;
  const { authorization } = req.headers;
  const user = authJWT(authorization);
  const currentDate = new Date().toString();
  const board = await Board.find({ userId: user.userId });
  if (board) {
    const task = new Task({
      userId: user.userId,
      boardId: board._id,
      name: newTaskInfo.name,
      creationDate: currentDate
    });
    await task.save()
      .then((saved) => res.status(200).json({ 'message': 'Task created successfully' }))
      .catch(err => next(err));
  } else {
    return res.status(400).json({ message: 'Board not found' });
  }
}

const getTaskById = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = authJWT(authorization);
  const board = await Board.find({ userId: user.userId });
  if (board) {
    await Task.findById(req.params.id)
      .then(task => res.status(200).json({ 'task': task }))
      .catch(err => next(err));
  } else {
    return res.status(400).json({ message: 'Board not found' });
  }
}

const editTaskById = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = authJWT(authorization);
  const task = req.body.payload;
  const board = await Board.find({ userId: user.userId });

  if (board) {
    if (task.name) {
      await Task.findByIdAndUpdate({ _id: req.params.id, boardId: board._id }, {
        $set: { name: task.name }
      })
        .then((task) => {
          task.save()
            .then(saved => res.status(200).json({ 'message': 'Task name changed successfully' }))
            .catch(err => next(err));
        })
    }

    if (task.newComment) {
      await Task.findByIdAndUpdate({ _id: req.params.id, boardId: board._id }, {
        $set: { comments: comments.push(task.newComment) }
      })
        .then((task) => {
          task.save()
            .then(saved => res.status(200).json({ 'message': 'New comment added' }))
            .catch(err => next(err));
        })
    }
  } else {
    return res.status(400).json({ message: 'Board not found' });
  }
}

const deleteTask = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = authJWT(authorization);
  const board = await Board.find({ userId: user.userId });
  if (board) {
    await Task.findByIdAndDelete(req.params.id)
      .then(task => res.status(200).json({ 'message': 'Task deleted successfully' }))
      .catch(err => next(err));
  } else {
    return res.status(400).json({ message: 'Board not found' });
  }
}

module.exports = {
  getTasks,
  addNewTask,
  getTaskById,
  editTaskById,
  deleteTask
};
