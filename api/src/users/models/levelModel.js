const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
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
});

levelSchema.index({ slug: 1, typeSlug: 1 }, { unique: true });

module.exports = mongoose.model('levels', levelSchema);
