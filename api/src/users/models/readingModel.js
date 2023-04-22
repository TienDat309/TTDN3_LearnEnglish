const mongoose = require("mongoose");

const readingSchema = new mongoose.Schema({
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
      task: {
        type: Array,
        default: [],
      },
    },
  },
});

module.exports = mongoose.model("Readings", readingSchema);
