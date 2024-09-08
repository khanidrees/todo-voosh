const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    status: {
      type: String,
      // require: true,
      enum: ['todo', 'inprogress', 'done'],
      default: 'todo',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
const Course = mongoose.model('Task', taskSchema);

module.exports = Course;
