const mongoose = require("mongoose");

const speakingSchema = new mongoose.Schema({
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
      imageTopic:String,
      slugTopic:String,
      tranScript: String,
      videoTopic: String,
      contentTopic: String,
      task: {
        type: Array,
        default: [],
      },
    },
  },
});

module.exports = mongoose.model("Speakings", speakingSchema);
