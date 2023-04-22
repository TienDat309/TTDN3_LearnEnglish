const Listenings = require("../models/listeningsModel");
const Speakings = require("../models/speakingModels");
const Writings = require("../models/writingModels");
const Readings = require("../models/readingModel");

const skillCtrl = {
  getAllSkill: async (req, res) => {
    try {
      const listening = await Listenings.aggregate([
        {
          $project: {
            _id: 1,
            imageType: 1,
            dateCreate: 1,
            contentType: 1,
            type: 1,
            slug: 1,
          },
        },
        {
          $sort: { dateCreate: 1 },
        },
        {
          $limit: 1,
        },
      ]);
      const speaking = await Speakings.aggregate([
        {
          $project: {
            _id: 1,
            imageType: 1,
            dateCreate: 1,
            contentType: 1,
            type: 1,
            slug: 1,
          },
        },
        {
          $sort: { dateCreate: 1 },
        },
        {
          $limit: 1,
        },
      ]);
      const writing = await Writings.aggregate([
        {
          $project: {
            _id: 1,
            imageType: 1,
            dateCreate: 1,
            contentType: 1,
            type: 1,
            slug: 1,
          },
        },
        {
          $sort: { dateCreate: 1 },
        },
        {
          $limit: 1,
        },
      ]);
      const reading = await Readings.aggregate([
        {
          $project: {
            _id: 1,
            imageType: 1,
            dateCreate: 1,
            contentType: 1,
            type: 1,
            slug: 1,
          },
        },
        {
          $sort: { dateCreate: 1 },
        },
        {
          $limit: 1,
        },
      ]);
      res.json({
        listening:listening,
        speaking:speaking,
        writing:writing,
        reading:reading
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getdataListen: async (req, res) => {
    try {
      const listening = await Listenings.find()
        .lean()
        .sort({ dataCreate: "desc" });
      res.json(listening);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getdataSpeaking: async (req, res) => {
    try {
      const speaking = await Speakings.find()
        .lean()
        .sort({ dataCreate: "desc" });
      res.json(speaking);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getdataWriting: async (req, res) => {
    try {
      const writing = await Writings.find().lean().sort({ dataCreate: "desc" });
      res.json(writing);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getdataReading: async (req, res) => {
    try {
      const reading = await Readings.find().lean().sort({ dataCreate: "desc" });
      res.json(reading);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = skillCtrl;
