const mongoose = require('mongoose');
const { TASK_TYPE } = require('../../enum');

const { Schema } = mongoose;
const { Mixed } = Schema.Types;

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  image: String,
  content: String,
  typeSlug: {
    type: String,
    required: true,
  },
  levelSlug: {
    type: String,
    required: true,
  },
  dateCreate: { type: Date, default: Date.now },
  task: [
    {
      data: Mixed,
      taskName: String,
      type: {
        type: String,
        enum: Object.values(TASK_TYPE)
      }
    }
  ],
  grammarExplanation: String,
  radio: String,
  video: String,
  tranScript: String,
  readingText: String,
  tips: String,
});

topicSchema.index({ slug: 1, typeSlug: 1, levelSlug: 1 }, { unique: true });

module.exports = mongoose.model('topics', topicSchema);
