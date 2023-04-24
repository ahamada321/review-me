const express = require("express");
const router = express.Router();

const UserCtrl = require("./controllers/user");

//refering to ./controllers/user.js
router.post("/auth", UserCtrl.auth);

router.post("/register", UserCtrl.register);

router.get("/reset/:id", UserCtrl.setInitialPassword);

router.post("/search", UserCtrl.searchUsers);

router.post("/add-request", UserCtrl.authMiddleware, UserCtrl.addUserRequest);

router.post(
  "/accept-adding",
  UserCtrl.authMiddleware,
  UserCtrl.acceptAddUserRequest
);

router.post(
  "/remove-request",
  UserCtrl.authMiddleware,
  UserCtrl.removeUserRequest
);

router.get("/mystudents", UserCtrl.authMiddleware, UserCtrl.getMyUsers);

router.get("/:id", UserCtrl.authMiddleware, UserCtrl.getUserById);

router.patch("/:id", UserCtrl.authMiddleware, UserCtrl.updateUser);

router.delete("/:id", UserCtrl.authMiddleware, UserCtrl.deleteUser);

router.get("", UserCtrl.getUsers);

//router.post('/resend', UserCtrl.resendTokenPost )

module.exports = router;
