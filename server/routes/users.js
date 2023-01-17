const express = require("express");
const router = express.Router();

const UserCtrl = require("./controllers/user");

//refering to ./controllers/user.js
router.post("/auth", UserCtrl.auth);

router.get("/reset/:id", UserCtrl.setInitialPassword);

router.post("/register", UserCtrl.register);

router.post("/search", UserCtrl.searchUsers);

router.post("/addRequest", UserCtrl.authMiddleware, UserCtrl.addUsers);

router.get("/:id", UserCtrl.authMiddleware, UserCtrl.getUserById);

router.patch("/:id", UserCtrl.authMiddleware, UserCtrl.updateUser);

router.delete("/:id", UserCtrl.authMiddleware, UserCtrl.deleteUser);

router.get("", UserCtrl.getUsers);

//router.post('/resend', UserCtrl.resendTokenPost )

module.exports = router;
