const { normalizeErrors } = require("./helpers/mongoose");
const Booking = require("./models/booking");
const Payment = require("./models/payment");
const Post = require("./models/post");
const User = require("./models/user");
const moment = require("moment-timezone");

const config = require("../../config");

// Return all teachers revenues data
exports.getPayments = function (req, res) {
  const selectedMonth = req.params.id;
  const monthStart = moment
    .tz("Asia/Tokyo")
    .startOf("month")
    .subtract(selectedMonth, "month");
  const monthEnd = moment(monthStart).add(1, "month");

  Booking.aggregate([
    {
      $match: {
        $and: [
          { teacherRevenue: { $gt: 0 } },
          { createdAt: { $gte: monthStart.toDate(), $lt: monthEnd.toDate() } }, // toDate()  pics system time and discard timezone.
        ],
      },
    },
    {
      $group: {
        _id: "$user", // Create document by each user.
        thisMonthTeacherRevenue: { $sum: "$teacherRevenue" },
      },
    },
    { $sort: { _id: -1 } },
  ]).exec(function (err, result) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    if (result.length === 0) {
      return res.json(result);
    }

    User.populate(result, { path: "_id", select: "-password" }, function (
      err,
      result
    ) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(result);
    });
  });
};

// Return selected month revenues of login teacher
exports.getUserPayments = function (req, res) {
  const user = res.locals.user;
  const selectedMonth = req.params.id;
  const monthStart = moment
    .tz("Asia/Tokyo")
    .startOf("month")
    .subtract(selectedMonth, "month");
  const monthEnd = moment(monthStart).add(1, "month");

  Booking.find({
    user: user._id,
    createdAt: { $gte: monthStart, $lt: monthEnd },
  })
    .sort({ createdAt: -1 })
    .populate("user post", "-password")
    .exec(function (err, foundReports) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      res.json(foundReports);
    });
};
