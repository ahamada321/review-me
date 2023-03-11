const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  shared: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "draft" }, // done, active, pending, draft

  postname: {
    type: String,
    max: [128, "Too long, max is 128 characters."],
    required: "Student name is required",
  },
  description: String,
  bottleneck: String,
  privateOption: Boolean,
  memo: String,

  user: { type: Schema.Types.ObjectId, ref: "User" }, // attach teacher
  feedbacks: [{ type: Schema.Types.ObjectId, ref: "Booking" }], // reports for this user
  // lastLesson: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
