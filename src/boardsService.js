const { Board } = require('./models/Boards.js');
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

const getBoards = async (req, res, next) => {
  const selectedParams = req.query;
  const { authorization } = req.headers;
  const user = authJWT(authorization);

  await Board.find({ userId: user.userId })
    .then((result) => {
      if (selectedParams) {
        if (selectedParams.name) {
          let boardNameInput = selectedParams.name.toLowerCase();
          result = result.filter(
            x => x.name.toLowerCase().includes(boardNameInput)
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
            case 'Number of Tasks':
              result.sort((a, b) => a.numberOfTasks - b.numberOfTasks);
              break;
          }
        }

        if (selectedParams.order) {
          if (selectedParams.order === 'DESC') {
            result = result.reverse();
          }
        }

        return res.status(200).json({ 'boards': result });
      } else {
        return res.status(200).json({ 'boards': result });
      }
    })
    .catch(err => next(err));
}

const addNewBoard = async (req, res, next) => {
  const newBoardInfo = req.body.payload;
  const { authorization } = req.headers;
  const user = authJWT(authorization);

  const board = new Board({
    userId: user.userId,
    name: newBoardInfo.name,
    description: newBoardInfo.description,
    creationDate: new Date().toLocaleDateString(),
    created_at: new Date(),
    numberOfTasks: 0
  });

  await board.save()
    .then((saved) => res.status(200).json({ 'message': 'Board created successfully' }))
    .catch(err => next(err));
}

const getBoardById = async (req, res, next) => {
  await Board.findById(req.params.id)
    .then(board => res.status(200).json({ 'board': board }))
    .catch(err => next(err));
}

const editBoardById = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = authJWT(authorization);
  const board = req.body.payload;

  if (board.name) {
    await Board.findByIdAndUpdate({ _id: req.params.id, userId: user.id }, {
      $set: { name: board.name }
    })
      .then((board) => {
        board.save()
          .then(saved => res.status(200).json({ 'message': 'Board name changed successfully' }))
          .catch(err => next(err));
      })
  }

  if (board.numberOfTasks) {
    await Board.findByIdAndUpdate({ _id: req.params.id, userId: user.id }, {
      $set: { numberOfTasks: board.numberOfTasks }
    })
      .then((board) => {
        board.save()
          .then(saved => res.status(200).json({ 'message': 'Board number of tasks changed successfully' }))
          .catch(err => next(err));
      })
  }
}

const deleteBoard = async (req, res, next) => {
  await Board.findByIdAndDelete(req.params.id)
    .then(board => res.status(200).json({ 'message': 'Board deleted successfully' }))
    .catch(err => next(err));
}

module.exports = {
  getBoards,
  addNewBoard,
  getBoardById,
  editBoardById,
  deleteBoard
};
