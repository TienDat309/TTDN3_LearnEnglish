const TypeModel = require('../models/typeModel');

const typeController = {
  get: async (req, res) => {
    try {
      const { slug } = req.params;
      const data = await TypeModel.aggregate([
        { $match: { slug } },
        {
          $lookup: {
            from: 'levels',
            let: { typeSlug: '$slug' },
            pipeline: [
              { $match: { $expr: { $eq: ['$typeSlug', '$$typeSlug'] } } },
            ],
            as: 'levels',
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
      const data = await TypeModel.find({}).lean();
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { slug } = req.params;
      const data = await TypeModel.findOneAndUpdate(
        { slug },
        { $set: { ...req.body } },
        { new: true }
      );
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = typeController;
