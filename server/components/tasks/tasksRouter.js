// const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { body } = require('express-validator');

const taskController = require('./tasksController');
const { isAuthorized } = require('../auth/auth');

require('dotenv').config();

router.get('/', isAuthorized, taskController.getTasks);

router.get('/:taskId', isAuthorized, taskController.getTask);

router.post('/', isAuthorized, [
  body('title')
    .notEmpty()
    .isString(),
  body('description')
    .notEmpty()
    .isString(),
  body('userId')
    .notEmpty(),
], taskController.addTasks);

router.patch('/:taskId', isAuthorized, taskController.updateTasks);

router.delete('/:taskId', isAuthorized, taskController.deleteTask);

module.exports = router;
