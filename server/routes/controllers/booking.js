const { normalizeErrors } = require("./helpers/mongoose");
const Booking = require("./models/booking");
const User = require("./models/user");
const Notification = require("./models/notification");
const config = require("../../config");
const moment = require("moment-timezone");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(config.SENDGRID_API_KEY);

const LESSON_CHANGED = "lesson_changed";

function sendEmailTo(sendTo, sendMsg, bookingData) {
  let msg = {};

  if (sendMsg === LESSON_CHANGED) {
    msg = {
      to: sendTo,
      from: {
        name: "レッスンカレンダー",
        email: "info@aeru.me",
      },
      subject: bookingData.title + "さんの予約が変更されました",
      text:
        bookingData.title +
        "さんのレッスン予約が\n\n" +
        moment(bookingData.oldStart)
          .tz("Asia/Tokyo")
          .format("MM月DD日 HH:mm〜") +
        " → " +
        moment(bookingData.start).tz("Asia/Tokyo").format("MM月DD日 HH:mm〜") +
        "\n\n" +
        "に予約が変更されました。\n" +
        "このメッセージは「レッスンカレンダー」自動配信メールです。",
    };
  } else {
    return res.status(422).send({
      errors: [
        {
          title: "Could not send email!",
          detail: "Please select appropriate email content!",
        },
      ],
    });
  }

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

function isValidBooking(requestBooking, existingBookings) {
  if (existingBookings && existingBookings.length === 0) {
    return true;
  }

  const reqStart = moment(requestBooking.start);
  const reqEnd = moment(requestBooking.start)
    .add(requestBooking.courseTime, "minute")
    .subtract(1, "minute");

  return existingBookings.every(function (booking) {
    const existingStart = moment(booking.start);
    const existingEnd = moment(booking.end).subtract(1, "minute");
    // return (
    //   (existingStart < reqStart && existingEnd < reqStart) ||
    //   (reqEnd < existingStart && reqEnd < existingEnd)
    // );
    return existingEnd < reqStart || reqEnd < existingStart;
  });
}

exports.createBooking = async (req, res) => {
  try {
    const { teacher, student } = req.body;
    const booking = new Booking(req.body);

    const foundBookings = await Booking.find({ teacher });
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
    await booking.save();
    await User.findOneAndUpdate(
      { _id: teacher },
      { $push: { bookings: booking } }
    );
    if (student) {
      await User.findOneAndUpdate(
        { _id: student },
        { $push: { bookings: booking } }
      );
    }

    return res.json({ status: "success" });
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const bookingData = req.body;
    await Booking.findOneAndUpdate({ _id: bookingData._id }, bookingData);
    if (userId == bookingData.student) {
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

      const savedNotification = await newNotification.save();
      await User.findOneAndUpdate(
        { _id: bookingData.teacher },
        { $push: { notifications: savedNotification } }
      );
      const foundTeacher = await User.findOne({ _id: bookingData.teacher });
      sendEmailTo(foundTeacher.email, LESSON_CHANGED, bookingData);
    }
    return res.json({ status: "updated" });
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.getBookingById = function (req, res) {
  const bookingId = req.params.id;
  Booking.findById(bookingId, (err, foundBooking) => {
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

exports.getUpcomingBookings = async (req, res) => {
  try {
    const userId = res.locals.user;
    const student = req.params.id !== "undefined" ? req.params.id : userId;

    const foundBookings = await Booking.find({
      student,
      start: { $gt: moment().tz("Asia/Tokyo") },
    }).sort({ start: 1 });
    return res.json(foundBookings);
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.getFinishedBookings = async (req, res) => {
  try {
    const userId = res.locals.user;
    const student = req.params.id !== "undefined" ? req.params.id : userId;

    const foundBookings = await Booking.find({
      student,
      start: { $lte: moment().tz("Asia/Tokyo") },
    }).sort({ start: -1 });
    return res.json(foundBookings);
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.countUserBookings = async (req, res) => {
  try {
    const { userId, addMonth } = req.query;
    // const userId = req.params.id;
    const monthStart = moment()
      .tz("Asia/Tokyo")
      .add(addMonth, "month")
      .startOf("month");
    const nextMonthStart = moment(monthStart)
      .tz("Asia/Tokyo")
      .add(1, "month")
      .startOf("month");

    const foundBookingsCounts = await Booking.count({
      student: userId,
      start: { $gte: monthStart, $lt: nextMonthStart },
    });

    return res.json(foundBookingsCounts);
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.params.id;
    const foundBookings = await Booking.find({
      $or: [{ teacher: userId }, { student: userId }],
    }).sort({ start: -1 });

    return res.json(foundBookings);
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.getUserDateBlockBookings = async (req, res) => {
  try {
    const userId = req.params.id;
    const foundBookings = await Booking.find({
      teacher: userId,
      title: "休み",
    }).sort({ start: 1 });

    return res.json(foundBookings);
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};
