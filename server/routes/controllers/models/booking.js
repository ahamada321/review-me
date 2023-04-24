const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  createdAt: { type: Date, default: Date.now },

  title: String,
  start: { type: Date, required: "Starting date is required" },
  oldStart: Date,
  courseTime: Number,
  end: Date,
  oldEnd: Date,
  allDay: Boolean,

  display: String,
  color: String,

  perMonth: Number,
  memo: String,

  student: { type: Schema.Types.ObjectId, ref: "User" }, // Patient
  teacher: { type: Schema.Types.ObjectId, ref: "Post" }, // Room
  status: { type: String, default: "pending" },
  // review: { type: Schema.Types.ObjectId, ref: "Review" },
});

module.exports = mongoose.model("Booking", bookingSchema);
