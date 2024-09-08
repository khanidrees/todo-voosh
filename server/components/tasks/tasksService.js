const createHttpError = require('http-errors');
const Task = require('./tasksModel');
const User = require('../auth/userModel');
const { ApiError } = require('../../utils/ApiError');
const { default: mongoose } = require('mongoose');

const getTasks = async (id,next) => {
  try {
    const tasks = await Task.find({ $and:[{isDeleted: false}, { user: new mongoose.Types.ObjectId(id) } ]}).lean();
    return tasks;
  } catch (err) {
    next(err);
  }
};

const getTask = async (id, next) => {
  try {
    const task = await Task.findOne({ _id: id }).lean();
    return task;
  } catch (err) {
    next(err);
  }
};

const addTask = async (title, description, userId, next) => {
  try {
    const user = User.findById(userId);
    if (!user) {
      next(new ApiError('user not found'));
    }
    const task = await Task.create({
      title, description, user: userId,
    });
    return task;
  } catch (err) {
    next(err);
  }
};

const updateTask = async (id, updateObject, next) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: id }, { $set: updateObject }, { new: true });
    if (!task) next(new ApiError(500, 'error while updating Task'));
    return task;
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (id, next) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: id }, { $set: { isDeleted:true } }, { new: true });;
    return task;
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask
};
