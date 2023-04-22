const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const paymentsSchema = new mongoose.Schema({
  studentId: ObjectId,
  meetingId: ObjectId,
  time: Number,
});

module.exports = mongoose.model('Payments', paymentsSchema);
