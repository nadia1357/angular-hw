const { Task } = require('./models/Tasks.js');
const { Board } = require('./models/Boards.js');

const getTasks = async (req, res, next) => {
  const selectedParams = {
    name: req.query.name,
    sort: req.query.sort,
    order: req.query.order
  };
  const boardId = req.query.boardId;

  await Task.find({ userId: req.user._id, boardId: boardId })
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
            result = result.reverse();
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
  const newTaskInfo = req.body;
  const currentDate = new Date().toString();
  const board = await Board.find({ userId: req.user._id, _id: newTaskInfo.boardId });
  if (board) {
    const task = new Task({
      userId: req.user._id,
      boardId: newTaskInfo.boardId,
      name: newTaskInfo.name,
      status: newTaskInfo.status,
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
    name: req.query.name,
    sort: req.query.sort,
    order: req.query.order
  };

  let task = await Task.findOne({ _id: req.params.id });
  if (task.comments) {
    let comments = task.comments;
    if (selectedParams) {
      if (selectedParams.name) {
        let commentNameInput = selectedParams.name.toLowerCase();
        comments = comments.filter(
          x => x.toLowerCase().includes(commentNameInput)
        )
      }

      if (selectedParams.sort) {
        switch (selectedParams.sort) {
          case 'Name':
            comments.sort((a, b) => {
              let nameA = a.toLowerCase();
              let nameB = b.toLowerCase();
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
          comments = comments.reverse();
        }
      }
      task.comments = comments;
      res.status(200).json({ 'task': task })
    }
  }
}

const editTaskById = async (req, res, next) => {
  const task = req.body;

  if (task.name) {
    await Task.findByIdAndUpdate({ _id: req.params.id }, {
      $set: { name: task.name }
    })
      .then((task) => {
        task.save()
          .then(saved => res.status(200).json({ 'message': 'Task name changed successfully' }))
          .catch(err => next(err));
      })
  }

  if (task.status) {
    await Task.findByIdAndUpdate({ _id: req.params.id }, {
      $set: { status: task.status }
    })
      .then((task) => {
        task.save()
          .then(saved => res.status(200).json({ 'message': `Task status changed to ${task.status}` }))
          .catch(err => next(err));
      })
  }

  if (task.comments) {
    if (task.comments[0] === 'new comment') {
      let currentTask = await Task.findOne({ _id: req.params.id });
      if (currentTask.comments === undefined) {
        currentTask.comments = [];
      }
      currentTask.comments.push(task.comments[1]);

      await Task.findByIdAndUpdate({ _id: req.params.id }, {
        $set: { comments: currentTask.comments }
      })
        .then((task) => {
          task.save()
            .then(saved => res.status(200).json({ 'message': 'New comment added' }))
            .catch(err => next(err));
        })
    }

    if (task.comments[0] === 'comment to change') {
      let currentTask = await Task.findOne({ _id: req.params.id });
      if (currentTask.comments) {
        currentTask.comments.forEach((el, index) => {
          if (el === task.comments[1]) {
            currentTask.comments[index] = task.comments[2];
          }
        });
      } else {
        currentTask.comments = [];
      }

      await Task.findByIdAndUpdate({ _id: req.params.id }, {
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
      await Task.findByIdAndUpdate({ _id: req.params.id }, {
        $set: { comments: currentTask.comments }
      })
        .then((task) => {
          task.save()
            .then(saved => res.status(200).json({ 'message': 'Comment deleted' }))
            .catch(err => next(err));
        })
    }
  }
}

const deleteTask = async (req, res, next) => {
  await Task.findByIdAndDelete(req.params.id)
    .then(task => res.status(200).json({ 'message': 'Task deleted successfully' }))
    .catch(err => next(err));
}

module.exports = {
  getTasks,
  addNewTask,
  getTaskById,
  editTaskById,
  deleteTask
}
