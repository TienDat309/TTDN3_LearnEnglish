const mongoose = require("mongoose");

const vocabularySchema = new mongoose.Schema({
  type:String,
  dateCreate: { type: Date, default: Date.now },
  level: {
    nameLevel: String,
    slugLevel: String,
    images: String,
    contentLevel: String,
    topic: {
      topicCode: String,
      nameTopic: String,
      slug: String,
      imageTopic: String,
      contentTopic: String,
      task: {
        type: Array,
        default: [],
      },
    },
  },
});

module.exports = mongoose.model("Vocabularys", vocabularySchema);
