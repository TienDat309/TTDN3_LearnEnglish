const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  payload:Object
});

module.exports = mongoose.model("Meetings", meetingSchema);
