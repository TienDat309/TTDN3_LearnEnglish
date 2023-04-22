const TopicModel = require('../models/topicModel');

const topicController = {
  get: async (req, res) => {
    try {
      const { slug, typeSlug, levelSlug } = req.params;
      const data = await TopicModel.aggregate([
        { $match: { slug, typeSlug, levelSlug } },
        {
          $lookup: {
            from: 'tasks',
            let: {
              topicSlug: '$slug',
              typeSlug: '$typeSlug',
              levelSlug: '$levelSlug',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$typeSlug', '$$typeSlug'] },
                      { $eq: ['$levelSlug', '$$levelSlug'] },
                      { $eq: ['$topicSlug', '$$topicSlug'] },
                    ],
                  },
                },
              },
            ],
            as: 'tasks',
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
      const { typeSlug, levelSlug } = req.params;
      const data = await TopicModel.find({ typeSlug, levelSlug }).lean();
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const data = new TopicModel({ ...req.body });
      await data.save();
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { slug, typeSlug, levelSlug } = req.params;

      let agg = [];
      Object.entries(req.body).map((e, i) => {
        agg = [...agg, { $set: { [e[0]]: e[1] } }];
      });

      // agg = [
      //   ...agg,
      //   {
      //     $set: {
      //       'grammarExplanation.element_1': ['$grammarExplanation.element_1'],
      //     },
      //   },
      // ];

      const data = await TopicModel.findOneAndUpdate(
        { slug, typeSlug, levelSlug },
        agg,
        { new: true }
      );
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const { slug, typeSlug, levelSlug } = req.params;
      const data = await TopicModel.findOneAndRemove({
        slug,
        typeSlug,
        levelSlug,
      });
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  dashboard: async (req, res) => {
    try {
      const data = await TopicModel.aggregate([
        {
          $group: {
            _id: '$typeSlug',
            topic: { $push: '$$ROOT' },
            count: { $sum: 1 },
          },
        },
      ]);
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = topicController;
