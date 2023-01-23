const { normalizeErrors } = require("./helpers/mongoose");
const Booking = require("./models/booking");
const Payment = require("./models/payment");
const Rental = require("./models/rental");
const User = require("./models/user");
const moment = require("moment-timezone");

const config = require("../../config");

function isValidBooking(requestBooking, rentalBookings) {
  let isValid = true;
  if (rentalBookings && rentalBookings.length > 0) {
    isValid = rentalBookings.every(function (booking) {
      const reqStart = moment(requestBooking.start);
      const reqEnd = moment(requestBooking.start)
        .add(requestBooking.courseTime, "minutes")
        .subtract(1, "minute");
      const acturalStart = moment(booking.start);
      const acturalEnd = moment(booking.start)
        .add(booking.courseTime, "minutes")
        .subtract(1, "minute");
      return (
        (acturalStart < reqStart && acturalEnd < reqStart) ||
        (reqEnd < acturalStart && reqEnd < acturalEnd)
      );
    });
  }
  return isValid;
}

exports.createBooking = function (req, res) {
  const { start, end, courseTime, title, teacher, student } = req.body;

  const booking = new Booking({
    start,
    courseTime,
    end,
    title,
    teacher,
    student,
  });

  Booking.find({ teacher }).exec(function (err, foundBookings) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    if (!isValidBooking(booking, foundBookings)) {
      return res.status(422).send({
        errors: [
          {
            title: "予約できません",
            detail: "他の日程で予約を取り直してください",
          },
        ],
      });
    }

    booking.save(function (err) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      User.findOneAndUpdate(
        { _id: teacher._id },
        { $push: { bookings: booking } },
        { returnOriginal: false },
        function () {}
      );

      User.findOneAndUpdate(
        { _id: student.id },
        { $push: { bookings: booking } },
        { returnOriginal: false },
        function () {}
      );

      return res.json({ status: "success" });
    });
  });
};

exports.updateBooking = function (req, res) {
  const bookingData = req.body;

  Booking.findOneAndUpdate(
    { _id: bookingData._id },
    bookingData,
    { returnOriginal: false },
    function (err) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json({ status: "updated" });
    }
  );
};

exports.getBookingById = function (req, res) {
  const bookingId = req.params.id;
  Booking.findById(bookingId, function (err, foundBooking) {
    if (err) {
      return res.status(422).send({
        errors: {
          title: "予約が見つかりません",
          detail: "再度確認してください",
        },
      });
    }
    return res.json(foundBooking);
  });
};

exports.deleteBooking = function (req, res) {
  const user = res.locals.user;

  Booking.findById(req.params.id)
    .populate("user rental")
    // .populate('payment', '_id')
    // .populate('start')
    .exec(function (err, foundBooking) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      // if(foundBooking.user.id !== user.id) {
      //     return res.status(422).send({errors: [{title: "Invalid request!", detail: "You cannot delete other users booking!"}]})
      // }
      // if(foundBooking.status === 'active') {
      //     return res.status(422).send({errors: [{title: "Invalid request!", detail: "Cannot delete active booking!"}]})
      // }

      foundBooking.remove(function (err) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        Rental.updateOne(
          { _id: foundBooking.rental.id },
          { $pull: { bookings: foundBooking.id } },
          () => {}
        ); // Delete Booking from Rental

        User.updateOne(
          { _id: foundBooking.user.id },
          { $pull: { bookings: foundBooking.id } },
          () => {}
        ); // Delete Booking from User

        // Payment.updateOne({_id: foundBooking.payment.id}, {status: 'canseled by user'}, ()=>{})
        return res.json({ status: "deleted" });
      });
    });
};

exports.getUpcomingBookings = function (req, res) {
  const student = res.locals.user;

  Booking.find({
    student,
    start: { $gt: moment().tz("Asia/Tokyo") },
  })
    .sort({ start: 1 })
    .exec(function (err, foundBookings) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundBookings);
    });
};

exports.getFinishedBookings = function (req, res) {
  const student = res.locals.user;

  Booking.find({
    student,
    start: { $lte: moment().tz("Asia/Tokyo") },
  })
    .sort({ start: -1 })
    .exec(function (err, foundBookings) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundBookings);
    });
};

exports.getUserBookings = function (req, res) {
  const userId = req.params.id;

  Booking.findOne({ $or: [{ teacher: userId }, { student: userId }] })
    .sort({ start: -1 })
    .exec(function (err, foundBookings) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundBookings);
    });
};

exports.getStudentBookings = function (req, res) {
  const userId = res.locals.user;

  Booking.find({ teacher })
    .sort({ start: -1 })
    .exec(function (err, foundBookings) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundBookings);
    });
};

exports.createDateBlockBooking = function (req, res) {
  const booking = new Booking(req.body);

  User.findOneAndUpdate(
    { _id: booking.teacher },
    { $push: { bookings: booking } },
    { returnOriginal: false },
    function () {}
  );

  booking.save(function (err, result) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    return res.json(result.id);
  });
};
