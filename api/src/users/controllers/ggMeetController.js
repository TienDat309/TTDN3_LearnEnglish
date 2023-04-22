const Meetings = require("../models/ggMeetModels");
class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex|eq)\b/g,
      (match) => "$" + match
    );
    this.query.find(JSON.parse(queryStr));

    return this;
  }
}

const meetingCtrl = {
  saveCallId: async (req, res) => {
    try {
      const { payload } = req.body;

      const newmeeting = new Meetings({
        payload
      });
      // Save mongodb
      await newmeeting.save();

      res.json(newmeeting);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getCallId: async (req, res) => {

    try {
      const features = new ApiFeatures(
        Meetings.find()
          .lean(),
        req.query
      ).filtering()

      const meeting = await features.query;

      res.json(meeting);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = meetingCtrl;
