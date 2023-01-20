const express = require("express");
const router = express.Router();

const UserCtrl = require("./controllers/user");
const BookingCtrl = require("./controllers/booking");

router.get(
  "/upcoming",
  UserCtrl.authMiddleware,
  BookingCtrl.getUpcomingBookings
);

router.get(
  "/finished",
  UserCtrl.authMiddleware,
  BookingCtrl.getFinishedBookings
);

router.get("", UserCtrl.authMiddleware, BookingCtrl.getUserBookings); // All bookings

router.post("", UserCtrl.authMiddleware, BookingCtrl.createBooking);

router.patch("", UserCtrl.authMiddleware, BookingCtrl.updateBooking);

router.get("/:id", UserCtrl.authMiddleware, BookingCtrl.getBookingById);

router.delete("/:id", UserCtrl.authMiddleware, BookingCtrl.deleteBooking);

module.exports = router;
