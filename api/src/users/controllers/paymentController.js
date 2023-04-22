const Payments = require('../models/paymentModel');
const { ObjectId } = require('mongoose').Types;

const paymentCtrl = {
  saveData: async (req, res) => {
    try {
      const { studentId, meetingId } = req.body;

      const newTopic = new Payments({
        studentId,
        meetingId,
        time: Date.now(),
      });

      const duplicate = await Payments.aggregate([
        {
          $match: { studentId: ObjectId(studentId) },
        },
        {
          $lookup: {
            from: 'booked_meetings',
            let: { meetingId: '$meetingId' },
            pipeline: [{ $match: { $expr: { $eq: ['$$meetingId', '$_id'] } } }],
            as: 'meetings',
          },
        },
        {
          $unwind: { path: '$meetings', preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: 'booked_meetings',
            let: { meetingId: '$meetingId' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$_id', ObjectId(meetingId)] },
                },
              },
            ],
            as: 'new_meeting',
          },
        },
        {
          $unwind: { path: '$new_meeting', preserveNullAndEmptyArrays: true },
        },
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$new_meeting.dayCreate', '$meetings.dayCreate'] },
                {
                  $or: [
                    {
                      $and: [
                        {
                          $gte: [
                            '$meetings.hourCreate',
                            '$new_meeting.hourCreate',
                          ],
                        },
                        {
                          $lte: [
                            '$meetings.hourCreate',
                            '$new_meeting.endTime',
                          ],
                        },
                      ],
                    },
                    {
                      $and: [
                        {
                          $gte: [
                            '$meetings.endTime',
                            '$new_meeting.hourCreate',
                          ],
                        },
                        {
                          $lte: ['$meetings.endTime', '$new_meeting.endTime'],
                        },
                      ],
                    },
                    {
                      $and: [
                        {
                          $lte: [
                            '$meetings.hourCreate',
                            '$new_meeting.hourCreate',
                          ],
                        },
                        {
                          $gte: ['$meetings.endTime', '$new_meeting.endTime'],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
      ]);

      if (duplicate.length) {
        return res
          .status(400)
          .json({ msg: 'You already had schedule at this time' });
      }

      // save mongodb
      await newTopic.save();
      res.json({ msg: 'Success' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getData: async (req, res) => {
    try {
      const { studentId } = req.query;
      const query = {};
      if (studentId) query.studentId = ObjectId(studentId);
      const data = await Payments.aggregate([
        { $match: query },
        {
          $lookup: {
            from: 'booked_meetings',
            let: { meetingId: '$meetingId' },
            pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$meetingId'] } } }],
            as: 'meeting',
          },
        },
        {
          $unwind: { path: '$meeting', preserveNullAndEmptyArrays: true },
        },
      ]);
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = paymentCtrl;
