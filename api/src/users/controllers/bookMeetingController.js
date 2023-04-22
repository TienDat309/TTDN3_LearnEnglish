const { ObjectId } = require('mongoose').Types;
const { SKILLS, SKILL_LEVELS } = require('../../enum');
const Bookmeetings = require('../models/bookmeetingModel');
const Payments = require('../models/paymentModel');

const bookCtrl = {
  test: async (req, res) => {
    let { lecturerId, meetingId } = req.query;
    lecturerId = ObjectId(lecturerId);
    meetingId = ObjectId(meetingId);
    const result = await Bookmeetings.aggregate([
      {
        $match: { lecturerId },
      },
      {
        $lookup: {
          from: 'payments',
          let: { meetingId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$$meetingId', '$meetingId'] } } },
          ],
          as: 'payment',
        },
      },
      { $unwind: { path: '$payment', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'users',
          let: { userId: '$payment.studentId' },
          pipeline: [{ $match: { $expr: { $eq: ['$$userId', '$_id'] } } }],
          as: 'user',
        },
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
        $sort: { time: 1 },
      },
      {
        $group: {
          _id: '$user._id',
          firstname: { $first: '$user.firstname' },
          lastname: { $first: '$user.lastname' },
          email: { $first: '$user.email' },
        },
      },
      {
        $match: { _id: { $ne: null } },
      },
      {
        $lookup: {
          from: 'payments',
          pipeline: [{ $match: { $expr: { $eq: [meetingId, '$meetingId'] } } }],
          as: 'excluded_meeting',
        },
      },
      {
        $addFields: {
          excluded_id: {
            $in: ['$_id', '$excluded_meeting.studentId'],
          },
        },
      },
      {
        $match: { excluded_id: false },
      },
      {
        $limit: 10,
      },
    ]);
    res.json(result);
  },

  saveData: async (req, res) => {
    try {
      const {
        lecturerId,
        email,
        nameLectures,
        nameSkills,
        levelSkill,
        nameTopic,
        dayCreate,
        hourCreate,
        endTime,
        message,
        costTopic,
        linkMeeting,
      } = req.body;

      if (
        !nameLectures ||
        !email ||
        !nameSkills ||
        !nameTopic ||
        !levelSkill ||
        !dayCreate ||
        !hourCreate ||
        !endTime ||
        !linkMeeting
      )
        return res.status(400).json({ msg: 'Please fill in all fields.' });

      const newTopic = new Bookmeetings({
        lecturerId,
        email,
        nameLectures,
        nameSkills,
        levelSkill,
        nameTopic,
        dayCreate,
        hourCreate,
        message,
        costTopic,
        linkMeeting,
        endTime,
      });

      const duplicate = await Bookmeetings.find({
        dayCreate,
        $or: [
          {
            $and: [
              {
                hourCreate: { $gte: hourCreate },
              },
              {
                hourCreate: { $lte: endTime },
              },
            ],
          },
          {
            $and: [
              {
                endTime: { $gte: hourCreate },
              },
              {
                endTime: { $lte: endTime },
              },
            ],
          },
          {
            $and: [
              {
                hourCreate: { $lte: hourCreate },
              },
              {
                endTime: { $gte: endTime },
              },
            ],
          },
        ],
      });

      if (duplicate.length) {
        return res
          .status(400)
          .json({ msg: 'You already had schedule at this time' });
      }

      // save mongodb
      await newTopic.save();
      res.json({ msg: 'Created a topic' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getData: async (req, res) => {
    try {
      const { lecturerId, search, skill, level, prices } = req.query;
      let query = {};
      if (lecturerId) {
        query.lecturerId = ObjectId(lecturerId);
      }

      if (search) {
        query = {
          ...query,
          $or: [
            {
              nameTopic: {
                $regex: '.*' + search + '.*',
                $options: 'i',
              },
            },
            {
              nameLectures: {
                $regex: '.*' + search + '.*',
                $options: 'i',
              },
            },
          ],
        };
      }

      if (prices) {
        query.costTopic = {
          $gte: parseInt(prices[0]),
          $lte: parseInt(prices[1]),
        };
      }

      if (skill && skill.includes('true')) {
        const arr = Object.values(SKILLS);
        const skills = skill.map((e, i) => {
          if (e === 'true') return arr[i];
        });
        query.nameSkills = { $in: skills };
      }

      if (level && level.includes('true')) {
        const arr = Object.values(SKILL_LEVELS);
        const levels = level.map((e, i) => {
          if (e === 'true') return arr[i];
        });
        query.levelSkill = { $in: levels };
      }

      const sort = req.query.sort ? JSON.parse(req.query.sort) : { _id: -1 };

      let agg = [
        { $match: query },
        {
          $lookup: {
            from: 'payments',
            let: { meetingId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$$meetingId', '$meetingId'] },
                },
              },
              {
                $lookup: {
                  from: 'users',
                  let: { studentId: '$studentId' },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $eq: ['$$studentId', '$_id'] },
                      },
                    },
                  ],
                  as: 'student',
                },
              },
              {
                $unwind: { path: '$student', preserveNullAndEmptyArrays: true },
              },
            ],
            as: 'payments',
          },
        },
        {
          $addFields: {
            paymentsCount: { $size: '$payments' },
          },
        },
        { $sort: sort },
      ];

      const data = await Bookmeetings.aggregate(agg);
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getSuggestionStudentList: async (req, res) => {
    let { lecturerId, meetingId } = req.query;
    lecturerId = ObjectId(lecturerId);
    meetingId = ObjectId(meetingId);
    const result = await Bookmeetings.aggregate([
      {
        $match: { lecturerId },
      },
      {
        $lookup: {
          from: 'payments',
          let: { meetingId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$$meetingId', '$meetingId'] } } },
          ],
          as: 'payment',
        },
      },
      { $unwind: { path: '$payment', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'users',
          let: { userId: '$payment.studentId' },
          pipeline: [{ $match: { $expr: { $eq: ['$$userId', '$_id'] } } }],
          as: 'user',
        },
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
        $sort: { time: 1 },
      },
      {
        $group: {
          _id: '$user._id',
          firstname: { $first: '$user.firstname' },
          lastname: { $first: '$user.lastname' },
          email: { $first: '$user.email' },
        },
      },
      {
        $match: { _id: { $ne: null } },
      },
      {
        $lookup: {
          from: 'payments',
          pipeline: [{ $match: { $expr: { $eq: [meetingId, '$meetingId'] } } }],
          as: 'excluded_meeting',
        },
      },
      {
        $addFields: {
          excluded_id: {
            $in: ['$_id', '$excluded_meeting.studentId'],
          },
        },
      },
      {
        $match: { excluded_id: false },
      },
      {
        $limit: 10,
      },
    ]);
    res.json(result);
  },
};
module.exports = bookCtrl;
