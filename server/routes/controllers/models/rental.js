const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  shared: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },

  rentalname: {
    type: String,
    max: [128, "Too long, max is 128 characters."],
    required: "Student name is required",
  },
  selectedInstrument: Object,
  selectedCourse: Object,
  perMonth: { type: Number, default: 2 },
  memo: String,

  user: { type: Schema.Types.ObjectId, ref: "User" }, // attach teacher
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }], // reports for this user
  // lastLesson: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Rental", rentalSchema);
