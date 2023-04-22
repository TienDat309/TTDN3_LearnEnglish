const TaskModel = require('../models/taskModel');

const taskController = {
  get: async (req, res) => {
    try {
      const { slug, typeSlug, levelSlug, topicSlug } = req.params;
      const data = await TaskModel.findOne({
        slug,
        typeSlug,
        levelSlug,
        topicSlug
      }).lean();
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  search: async (req, res) => {
    try {
      const { typeSlug, levelSlug, topicSlug } = req.params;
      const data = await TaskModel.find({ typeSlug, levelSlug, topicSlug }).lean();
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const data = new TaskModel({ ...req.body });
      await data.save();
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { slug, typeSlug, levelSlug, topicSlug } = req.params;

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

      const data = await TopicModel.TaskModel(
        { slug, typeSlug, levelSlug, topicSlug },
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
      const { slug, typeSlug, levelSlug, topicSlug } = req.params;
      const data = await TaskModel.findOneAndRemove({
        slug,
        typeSlug,
        levelSlug,
        topicSlug
      });
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = taskController;
