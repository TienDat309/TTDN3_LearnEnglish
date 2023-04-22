const LevelModel = require('../models/levelModel');
const TopicModel = require('../models/topicModel');

const levelController = {
  get: async (req, res) => {
    try {
      const { slug, typeSlug } = req.params;
      const data = await LevelModel.aggregate([
        { $match: { slug, typeSlug } },
        {
          $lookup: {
            from: 'topics',
            let: { levelSlug: '$slug', typeSlug: '$typeSlug' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$typeSlug', '$$typeSlug'] },
                      { $eq: ['$levelSlug', '$$levelSlug'] },
                    ],
                  },
                },
              },
            ],
            as: 'topics',
          },
        },
      ]);
      res.json(data[0]);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  search: async (req, res) => {
    try {
      const { typeSlug } = req.params;
      const data = await LevelModel.find({ typeSlug }).lean();
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const data = new LevelModel({ ...req.body });
      await data.save();
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { slug, typeSlug } = req.params;
      const data = await LevelModel.findOneAndUpdate(
        { slug, typeSlug },
        { $set: { ...req.body } },
        { new: true }
      );
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const { slug, typeSlug } = req.params;
      const data = await LevelModel.findOneAndRemove({ slug, typeSlug });
      await TopicModel.deleteMany({ typeSlug, levelSlug: slug });
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = levelController;
