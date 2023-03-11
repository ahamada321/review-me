const express = require("express");
const router = express.Router();

const UserCtrl = require("./controllers/user");
const PostCtrl = require("./controllers/post");

router.get("/secret", UserCtrl.authMiddleware, function (req, res) {
  res.json({ secret: true });
});

router.get("/manage", UserCtrl.authMiddleware, PostCtrl.getOwnerPosts);

router.get("/total", PostCtrl.getPostsTotal);

router.get("/:id", PostCtrl.getPostById);

router.delete("/:id", UserCtrl.authMiddleware, PostCtrl.deletePost);

router.patch("", UserCtrl.authMiddleware, PostCtrl.updatePost);

router.post("", UserCtrl.authMiddleware, PostCtrl.createPost);

router.get("", PostCtrl.getPosts);

router.get("/search/:searchWords", PostCtrl.searchPosts);

module.exports = router;
