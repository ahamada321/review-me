const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  isVerified: { type: Boolean, default: true },
  userRole: { type: String, default: "Student" }, // Student, Teacher, Owner

  username: {
    type: String,
    max: [32, "Too long, max is 32 characters."],
    min: [4, "Too short, min is 4 characters."],
    required: "Username is required",
  },
  email: {
    type: String,
    max: [128, "Too long, max is 64 characters."],
    required: "Email is required",
  },
  password: {
    type: String,
    max: [32, "Too long, max is 32 characters."],
    min: [4, "Too short, min is 4 characters."],
    required: "Password is required",
  },

  teachers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  students: [{ type: Schema.Types.ObjectId, ref: "User" }],
  pendingTeachers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  pendingStudents: [{ type: Schema.Types.ObjectId, ref: "User" }],

  perMonth: { type: Number, default: 4 },
  courseTime: { type: Number, default: 60 },
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  rentals: [{ type: Schema.Types.ObjectId, ref: "Rental" }],
});

userSchema.methods.hasSamePassword = function (requestPassword) {
  return bcrypt.compareSync(requestPassword, this.password);
};

userSchema.pre("save", function (next) {
  const user = this;

  // Skip if user didn't update user password
  if (user.password) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        // Store hash in your password DB.
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
