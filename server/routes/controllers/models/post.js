const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  shared: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "draft" }, // done, active, pending, draft

  postname: {
    type: String,
    max: [128, "Too long, max is 128 characters."],
    required: "件名を入力してください",
  },
  description: String,
  bottleneck: String,
  privateOption: Boolean,
  memo: String,

  user: { type: Schema.Types.ObjectId, ref: "User" }, // attach teacher
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }], // reports for this user
  // lastLesson: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
