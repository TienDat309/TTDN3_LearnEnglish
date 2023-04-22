const mongoose = require('mongoose');
const { TASK_TYPE } = require('../../enum');

const { Schema } = mongoose;
const { Mixed } = Schema.Types;

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instruction: String,
  type: {
    type: String,
    enum: Object.values(TASK_TYPE),
  },
  data: Mixed,
  slug: {
    type: String,
    required: true,
  },
  topicSlug: {
    type: String,
    required: true,
  },
  typeSlug: {
    type: String,
    required: true,
  },
  levelSlug: {
    type: String,
    required: true,
  },
  dateCreate: { type: Date, default: Date.now },
});

taskSchema.index(
  { slug: 1, typeSlug: 1, levelSlug: 1, topicSlug: 1 },
  { unique: true }
);

module.exports = mongoose.model('tasks', taskSchema);
