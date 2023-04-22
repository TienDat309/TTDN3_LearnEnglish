const mongoose = require("mongoose");

const writingSchema = new mongoose.Schema({
  imageType: String,
  dateCreate: { type: Date, default: Date.now },
  contentType: String,
  type: String,
  slug: String,
  level: {
    nameLevel: String,
    slugLevel:String,
    images: String,
    contentLevel: String,
    topic: {
      topicCode: String,
      nameTopic: String,
      slugTopic:String,
      imageTopic: String,
      contentTopic: String,
      readingText:String,
      tips:String,
      task: {
        type: Array,
        default: [],
      },
    },
  },
});

module.exports = mongoose.model("Writings", writingSchema);
