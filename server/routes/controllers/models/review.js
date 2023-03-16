const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ALLOWED_RATING = [1, 2, 3, 4];

const reviewSchema = new Schema({
  cretatedAt: { type: Date, default: Date.now },
  username: String,
  gender: String,
  job: String,
  age: Number,
  rating: Number,
  comment: String,
  problem: String,
  improvement: String,
  approved: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
});

reviewSchema.pre("save", function (next) {
  const user = this;

  // Allay start from '0'
  if (ALLOWED_RATING.indexOf(this.rating) >= 0) {
    next();
  } else {
    const err = new Error({ rating: "Invalid rating!" });
    err.erros = {};
    err.erros.rating = { message: "Not valid rating!" };
    next(err);
  }
});

module.exports = mongoose.model("Review", reviewSchema);
