const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { isHttpError } = require('http-errors');
const cors = require('cors');

require('dotenv').config();

const { connectToDatabase } = require('./db/connect');

const userRouter = require('./components/auth/userRouter');
const taskRouter = require('./components/tasks/tasksRouter');
const { ApiError } = require('./utils/ApiError');

const app = express();

connectToDatabase();

// for security
app.use(helmet());

const whitelist = [process.env.FRONTEND_URL];
console.log(whitelist);
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);

// app.use('/', (req, res) => res.json({ hi: 'dkjsdk' }));

app.use((err, req, res, next) => {
  let statusCode = 500;
  let errorMessage = 'Something broke!';
  console.log('err', err);
  if (isHttpError(err)) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  }
  return res.status(statusCode).json(err);
});

module.exports = app;
