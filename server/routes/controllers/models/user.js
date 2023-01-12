const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  isVerified: { type: Boolean, default: true },
  // shared: { type: Boolean, default: true },
  userRole: { type: String, default: "User" }, // User, Owner, OEM_Owner
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,

  username: {
    type: String,
    max: [32, "Too long, max is 32 characters."],
    min: [4, "Too short, min is 4 characters."],
    required: "Username is required",
  },
  email: String,
  password: {
    type: String,
    max: [32, "Too long, max is 32 characters."],
    min: [4, "Too short, min is 4 characters."],
    required: "Password is required",
  },
  birthday: Date,
  gender: String,
  phoneNumber: String,
  address: String,
  covid: String,
  purpose: String,
  purposeDetail: String,
  toothExtraction: String,
  whenDidYouExtractTooth: String,
  BleedingDidntStop: Boolean,
  HadPainForDays: Boolean,
  HadFever: Boolean,
  HadAnemia: Boolean,
  OtherTroubleAfterToothExtraction: String,
  sideEffect: String,
  GetStomach: Boolean,
  GetRash: Boolean,
  GetItchy: Boolean,
  allergic: String,
  HaveRashEasily: Boolean,
  HaveUrticaria: Boolean,
  HaveAsthma: Boolean,
  OtherAllergic: String,
  medicalIllness: String,
  Heart: Boolean,
  Liver: Boolean,
  Kidney: Boolean,
  Hemophilia: Boolean,
  Diabetes: Boolean,
  HighBloodPressure: Boolean,
  LowBloodPressure: Boolean,
  Asthma: Boolean,
  Tuberculosis: Boolean,
  OtherMedicalIllness: String,
  toothCleaningTimes: Number,
  request: String,
  medicalInsurance: String,
  condition: String,

  rentals: [{ type: Schema.Types.ObjectId, ref: "Rental" }],
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
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
