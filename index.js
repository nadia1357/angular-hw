const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://NadiiaMatura:FM190902@nadiiamaturaclustermong.0suldiz.mongodb.net/angular-hw-app');
const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function() {
  console.log ('we are connected');
});

const { boardsRouter } = require('../../src/boardsRouter.js');
const { tasksRouter } = require('../../src/tasksRouter.js');
const { usersRouter } = require('../../src/usersRouter.js');

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api', boardsRouter);
app.use('/api', tasksRouter);
app.use('/api', usersRouter);

const start = async () => {
  try {
    if (!fs.existsSync('files')) {
      fs.mkdirSync('files');
    }
    app.listen(8080, () => {
      console.log(`Server is listening at port 8080`);
    });
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
};

start();

// ERROR HANDLER
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send({ message: 'Server error' });
}
