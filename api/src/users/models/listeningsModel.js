const mongoose = require("mongoose");

const listeningSchema = new mongoose.Schema({
  imageType: String,
  dateCreate: { type: Date, default: Date.now },
  contentType: String,
  type: String,
  slug: String,
  idTopicCode:String,
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
      radio: String,
      tranScript: String,
      task: {
        type: Array,
        default: [],
      },
    },
  },
});

module.exports = mongoose.model("Listenings", listeningSchema);
