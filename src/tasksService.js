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
  const selectedParams = {
    name: req.params.name,
    sort: req.params.sort,
    order: req.params.order
  };
  const boardId = req.params.boardId;
  const { authorization } = req.headers;
  const user = authJWT(authorization);

  await Task.find({ userId: user.userId, boardId: boardId })
    .then((result) => {
      if (selectedParams) {
        if (selectedParams.name) {
          let taskNameInput = selectedParams.name.toLowerCase();
          result = result.filter(
            x => x.name.toLowerCase().includes(taskNameInput)
          )
        }

        if (selectedParams.sort) {
          switch (selectedParams.sort) {
            case 'Name':
              result.sort((a, b) => {
                let nameA = a.name.toLowerCase();
                let nameB = b.name.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
              })
              break;
            case 'Date':
              result.sort((a, b) => +a.created_at - +b.created_at);
              break;
          }
        }

        if (selectedParams.order) {
          if (selectedParams.order === 'DESC') {
            result.reverse();
          }
        }

        return res.status(200).json({ 'tasks': result });
      } else {
        return res.status(200).json({ 'tasks': result });
      }
    })
    .catch(err => next(err));
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
  const selectedParams = {
    name: req.params.name,
    sort: req.params.sort,
    order: req.params.order
  };
  const { authorization } = req.headers;
  const user = authJWT(authorization);
  const board = await Board.find({ userId: user.userId });
  if (board) {
    await Task.findById(req.params.id)
      .then(task => {
        const comments = task.comments;
        if (selectedParams) {
          if (selectedParams.name) {
            let commentNameInput = selectedParams.name.toLowerCase();
            comments = comments.filter(
              x => x.name.toLowerCase().includes(commentNameInput)
            )
          }

          if (selectedParams.sort) {
            switch (selectedParams.sort) {
              case 'Name':
                comments.sort((a, b) => {
                  let nameA = a.name.toLowerCase();
                  let nameB = b.name.toLowerCase();
                  if (nameA < nameB) return -1;
                  if (nameA > nameB) return 1;
                  return 0;
                })
                break;
              case 'Date':
                comments = task.comments;
                break;
            }
          }

          if (selectedParams.order) {
            if (selectedParams.order === 'DESC') {
              comments.reverse();
            }
          }
          task.comments = comments;
          res.status(200).json({ 'task': task })
        }
      })
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

    if (task.comments) {
      if (task.comments[0] === 'new comment') {
        await Task.findByIdAndUpdate({ _id: req.params.id, boardId: board._id }, {
          $set: { comments: comments.push(task.comments[1]) }
        })
          .then((task) => {
            task.save()
              .then(saved => res.status(200).json({ 'message': 'New comment added' }))
              .catch(err => next(err));
          })
      }

      if (task.comments[0] === 'comment to change') {
        let currentTask = await Task.find({ _id: req.params.id });
        if (currentTask.comments) {
          currentTask.comments.forEach((el, index) => {
            if (el === task.comments[1]) {
              currentTask.comments[index] = task.comments[2];
            }
          });
        } else {
          currentTask.comments = [];
        }
      
        await Task.findByIdAndUpdate({ _id: req.params.id, boardId: board._id }, {
          $set: { comments: currentTask.comments }
        })
          .then((task) => {
            task.save()
              .then(saved => res.status(200).json({ 'message': 'Comment changed' }))
              .catch(err => next(err));
          })
      }

      if (task.comments[0] === 'comment to delete') {
        let currentTask = await Task.find({ _id: req.params.id });
        if (currentTask.comments) {
              let deleteIndex = currentTask.comments.findIndex(el => el === task.comments[1]);
              currentTask.comments.splice(deleteIndex, 1);
        } 
        await Task.findByIdAndUpdate({ _id: req.params.id, boardId: board._id }, {
          $set: { comments: currentTask.comments }
        })
          .then((task) => {
            task.save()
              .then(saved => res.status(200).json({ 'message': 'Comment deleted' }))
              .catch(err => next(err));
          })
      }
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
}
