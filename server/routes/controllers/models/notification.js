const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  title: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: "User" }, // Teacher or Student
});

module.exports = mongoose.model("Notification", notificationSchema);
