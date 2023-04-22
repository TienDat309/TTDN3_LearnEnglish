const mongoose = require("mongoose");

const grammarSchema = new mongoose.Schema({
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
      grammarExplanation: {
        intro: String,
        element_1: {
          type: Array,
          default: [],
        },
        element_2: {
          type: Array,
          default: [],
        },
        element_3: {
          type: Array,
          default: [],
        },
        element_4: {
          type: Array,
          default: [],
        },
        element_5: {
          type: Array,
          default: [],
        },
      },
      task: {
        type: Array,
        default: [],
      },
    },
  },
});

module.exports = mongoose.model("Grammars", grammarSchema);
