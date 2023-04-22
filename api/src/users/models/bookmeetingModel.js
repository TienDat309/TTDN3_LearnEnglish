const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const bookedMeetingSchema = new mongoose.Schema({
  lecturerId: ObjectId,
  email: String,
  nameLectures: String,
  nameSkills: String,
  levelSkill: String,
  nameTopic: String,
  dayCreate: String,
  hourCreate: String,
  endTime: String,
  message: String,
  costTopic: Number,
  linkMeeting: String
});

module.exports = mongoose.model("booked_meeting", bookedMeetingSchema);
