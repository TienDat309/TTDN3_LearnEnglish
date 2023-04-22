const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  content: String,
});

module.exports = mongoose.model("types", typeSchema);
