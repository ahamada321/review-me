const Rental = require("./models/rental");
const Booking = require("./models/booking");
const User = require("./models/user");
const { normalizeErrors } = require("./helpers/mongoose");
const moment = require("moment-timezone");

exports.getRentalById = function (req, res) {
  const studentId = req.params.id;

  Rental.findById(studentId)
    //.populate('user', 'username -_id')
    .populate("user") // Need to consider security in future.
    //.populate('bookings', 'startAt endAt status -_id')
    .populate("bookings", "startAt endAt status _id") // Need to consider security in future.
    .exec(function (err, foundRental) {
      if (err) {
        return res.status(422).send({
          errors: {
            title: "Rental error!",
            detail: "Could not find Rental!",
          },
        });
      }
      return res.json(foundRental);
    });
};

exports.getRentalsTotal = function (req, res) {
  Rental.countDocuments({}, function (err, total) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    return res.json(total);
  });
};

exports.getRentals = function (req, res) {
  const { page, limit } = req.query;
  const monthStart = moment()
    .tz("Asia/Tokyo")
    .startOf("month")
    .subtract(1, "month");

  if (page && limit) {
    Rental.find({})
      .populate("user") // Need to consider security in future.
      .populate({
        path: "bookings",
        match: { createdAt: { $gte: monthStart } },
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec(function (err, foundRentals) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        return res.json(foundRentals);
      });
  } else {
    Rental.find({})
      // Rental.find({shared: true})
      .populate("user") // Need to consider security in future.
      .populate({
        path: "bookings",
        match: { createdAt: { $gte: monthStart } },
      })
      .sort({ createdAt: -1 })
      .exec(function (err, foundRentals) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        return res.json(foundRentals);
      });
  }
};

exports.searchRentals = function (req, res) {
  const { searchWords } = req.params;

  Rental.aggregate(
    [
      {
        $match: {
          rentalname: {
            $regex: searchWords,
            $options: "i",
          },
        },
      },
      { $sort: { createdAt: -1 } },
    ],
    function (err, foundRentals) {
      return res.json(foundRentals);
    }
  );
};

exports.getOwnerRentals = function (req, res) {
  const user = res.locals.user;
  const monthStart = moment()
    .tz("Asia/Tokyo")
    .startOf("month")
    .subtract(1, "month");

  Rental.find({ user, isShared: true })
    .populate({
      path: "bookings",
      match: { createdAt: { $gte: monthStart } },
    })
    .sort({ createdAt: -1 })
    .exec(function (err, foundRentals) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundRentals);
    });
};

exports.deleteRental = async function (req, res) {
  const rentalId = req.params.id;
  const user = res.locals.user;

  Rental.findById(rentalId)
    .populate({
      path: "bookings",
      select: "startAt",
      match: {
        startAt: {
          $gt: moment.tz("Asia/Tokyo").startOf("month").subtract(11, "month"),
        },
      }, // &gt: greater than. <- Pick up 1 year reports.
    })
    .exec(async function (err, foundRental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (user.userRole !== "Owner") {
        return res.status(422).send({
          errors: {
            title: "Invalid user!",
            detail: "Cannot delete other user profile!",
          },
        });
      }
      if (foundRental.bookings.length > 0) {
        return res.status(422).send({
          errors: {
            title: "Active reports!",
            detail: "一年以内のレッスン報告がある為削除できません",
          },
        });
      }

      try {
        foundRental.remove();
        await Booking.deleteMany({ rental: rentalId });
        return res.json({ status: "deleted" });
      } catch (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
    });
};

exports.updateRental = function (req, res) {
  const rentalData = req.body;
  const { patientId } = req.body;
  const rentalId = req.params.id;
  const user = res.locals.user;

  Rental.findById(rentalId)
    // .populate('user', '_id')
    .exec(function (err, foundRental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      // if(foundRental.user.id !== user.id) {
      //     return res.status(422).send({errors: {title: "Invalid user!", detail: "You are not rental owner!"}})
      // }
      if (!patientId) {
        return res.status(422).send({
          errors: [{ title: "Error!", detail: "講師IDを入力してください！" }],
        });
      }

      User.findOne({ patientId }, function (err, foundUser) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        rentalData.user = foundUser;

        try {
          const updatedRental = Rental.updateOne(
            { _id: foundRental.id },
            rentalData,
            () => {}
          );
          return res.json(updatedRental);
        } catch (err) {
          return res.json(err);
        }
      });
    });
};

exports.createRental = function (req, res) {
  const {
    shared,
    patientId,
    rentalname,
    selectedInstrument,
    selectedCourse,
    perMonth,
    memo,
  } = req.body;
  const user = res.locals.user;

  //referring from ../models/rental.js
  const rental = new Rental({
    shared,
    rentalname,
    selectedInstrument,
    selectedCourse,
    perMonth,
    memo,
  });

  if (!patientId) {
    return res.status(422).send({
      errors: [{ title: "Error!", detail: "講師IDを入力してください！" }],
    });
  }

  User.findOne({ patientId }, function (err, foundUser) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    rental.user = foundUser;

    Rental.estimatedDocumentCount({}, function (err, count) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      Rental.create(rental, function (err, newRental) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        foundUser.rentals.push(newRental); // This updates DB side.
        return res.json(rental.studentId);
      });
    });
  });
};
