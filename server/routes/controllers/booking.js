const { normalizeErrors } = require("./helpers/mongoose");
const Booking = require("./models/booking");
const Payment = require("./models/payment");
const Rental = require("./models/rental");
const User = require("./models/user");
const Notification = require("./models/notification");
const moment = require("moment-timezone");

const config = require("../../config");

function isValidBooking(requestBooking, existingBookings) {
  let isValid = false;
  const reqStart = moment(requestBooking.start);
  const reqEnd = moment(requestBooking.start)
    .add(requestBooking.courseTime, "minute")
    .subtract(1, "minute");
  if (existingBookings && existingBookings.length === 0) {
    return true;
  }

  isValid = existingBookings.every(function (booking) {
    const existingStart = moment(booking.start);
    const existingEnd = moment(booking.end).subtract(1, "minute");
    return (
      (existingStart < reqStart && existingEnd < reqStart) ||
      (reqEnd < existingStart && reqEnd < existingEnd)
    );
  });

  return isValid;
}

exports.createBooking = function (req, res) {
  const { teacher, student } = req.body;

  const booking = new Booking(req.body);

  Booking.find({ teacher }).exec(function (err, foundBookings) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    if (!isValidBooking(booking, foundBookings)) {
      return res.status(422).send({
        errors: [
          {
            title: "この時間は既に予約で埋まっています",
            detail: "他の日程で予約し直してください",
          },
        ],
      });
    }

    booking.save(function (err) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      User.findOneAndUpdate(
        { _id: teacher },
        { $push: { bookings: booking } },
        { returnOriginal: false },
        function () {}
      );

      if (student) {
        User.findOneAndUpdate(
          { _id: student },
          { $push: { bookings: booking } },
          { returnOriginal: false },
          function () {}
        );
      }

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

      const newNotification = new Notification({
        title: bookingData.title + "さんのレッスン予約が変更されました",
        description:
          moment(bookingData.oldStart)
            .tz("Asia/Tokyo")
            .format("MM月DD日 HH:mm〜") +
          " → " +
          moment(bookingData.start).tz("Asia/Tokyo").format("MM月DD日 HH:mm〜"),
        user: bookingData.teacher,
      });

      newNotification.save(function (err, savedNotification) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        User.findOneAndUpdate(
          { _id: bookingData.teacher },
          { $push: { notifications: savedNotification } },
          { returnOriginal: false },
          function (err) {
            if (err) {
              return res
                .status(422)
                .send({ errors: normalizeErrors(err.errors) });
            }
            // sendEmailTo(teacherEmail, LESSON_CHANGED, req.hostname);
            return res.json({ status: "updated" });
          }
        );
      });
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
  const userId = res.locals.user.id;
  const bookingId = req.params.id;

  Booking.findById(bookingId, function (err, foundBooking) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    // if (foundBooking.teacher._id !== userId) {
    //   return res.status(422).send({
    //     errors: [
    //       {
    //         title: "Invalid request!",
    //         detail: "You cannot delete other users booking!",
    //       },
    //     ],
    //   });
    // }
    // if(foundBooking.status === 'active') {
    //     return res.status(422).send({errors: [{title: "Invalid request!", detail: "Cannot delete active booking!"}]})
    // }

    foundBooking.remove(function (err) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      User.findOneAndUpdate(
        { _id: userId },
        { $pull: { bookings: bookingId } },
        { returnOriginal: false },
        () => {}
      ); // Delete Booking from Teacher

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

exports.countUserBookings = function (req, res) {
  const userId = req.params.id;

  Booking.count({
    student: userId,
    start: {
      $gte: moment().tz("Asia/Tokyo").add(1, "month").startOf("month"),
      $lt: moment().tz("Asia/Tokyo").add(2, "month").startOf("month"),
    },
  }).exec(function (err, foundBookingsCounts) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    return res.json(foundBookingsCounts);
  });
};

exports.getUserBookings = function (req, res) {
  const userId = req.params.id;

  Booking.find({ $or: [{ teacher: userId }, { student: userId }] })
    .sort({ start: -1 })
    .exec(function (err, foundBookings) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundBookings);
    });
};

exports.getUserDateBlockBookings = function (req, res) {
  const userId = req.params.id;

  Booking.find({ teacher: userId, title: "休み" })
    .sort({ start: 1 })
    .exec(function (err, foundBookings) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundBookings);
    });
};
