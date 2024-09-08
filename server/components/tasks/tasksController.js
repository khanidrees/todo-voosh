const { validationResult } = require('express-validator');
const taskService = require('./tasksService');
const { ApiError } = require('../../utils/ApiError');
const { ApiResponse } = require('../../utils/ApiResponse');

const getTasks = async (req, res, next) => {
  try {
    const id = req.query?.userId;
    // console.log(req.query);
    const tasks = await taskService.getTasks(id, next);
    return res.status(200).json(new ApiResponse(200, tasks, 'tasks loaded in successfully'));
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const task = await taskService.getTask(taskId, next);
    return res.status(200).json(new ApiResponse(200, task, 'task loaded in successfully'));
  } catch (err) {
    next(err);
  }
};

const addTasks = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(new ApiError(422, 'Something went wrong while adding tasks', errors.array()));
  }
  const {
    title, description, userId,
  } = req.body;
  try {
    const task = await taskService.addTask(title, description, userId);
    return res.status(200).json(new ApiResponse(200, task, 'task added successfully'));
  } catch (err) {
    next(err);
  }
};

const updateTasks = async (req, res, next) => {
  const updateObject = req.body;
  const { taskId } = req.params;
  try {
    const task = await taskService.updateTask(taskId, updateObject, next);
    return res.status(200).json(new ApiResponse(200, task, 'task updated successfully'));
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const task = await taskService.deleteTask(taskId, next);
    return res.status(200).json(new ApiResponse(200, task, 'task deleted in successfully'));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTasks,
  getTask,
  addTasks,
  updateTasks,
  deleteTask,
};
