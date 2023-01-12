const express = require("express");
const router = express.Router();

const UserCtrl = require("./controllers/user");
const PaymentCtrl = require("./controllers/payment");

router.get("/:id", UserCtrl.authMiddleware, PaymentCtrl.getPayments);

router.get("/user/:id", UserCtrl.authMiddleware, PaymentCtrl.getUserPayments);

module.exports = router;
