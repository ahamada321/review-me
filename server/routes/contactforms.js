const express = require("express");
const router = express.Router();

const ContactformCtrl = require("./controllers/contactform");

router.post("/demo", ContactformCtrl.requestDemo);

router.post("", ContactformCtrl.sendFormMessage);

module.exports = router;
