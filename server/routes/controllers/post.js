const Post = require("./models/post");
const Booking = require("./models/booking");
const User = require("./models/user");
const { normalizeErrors } = require("./helpers/mongoose");
const moment = require("moment-timezone");

exports.getPostById = function (req, res) {
  const studentId = req.params.id;

  Post.findById(studentId)
    //.populate('user', 'username -_id')
    .populate("user") // Need to consider security in future.
    //.populate('bookings', 'start end status -_id')
    .populate("bookings", "start end status _id") // Need to consider security in future.
    .exec(function (err, foundPost) {
      if (err) {
        return res.status(422).send({
          errors: {
            title: "Post error!",
            detail: "Could not find Post!",
          },
        });
      }
      return res.json(foundPost);
    });
};

exports.getPostsTotal = function (req, res) {
  Post.countDocuments({}, function (err, total) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    return res.json(total);
  });
};

exports.getPosts = function (req, res) {
  const { page, limit } = req.query;
  const monthStart = moment()
    .tz("Asia/Tokyo")
    .startOf("month")
    .subtract(1, "month");

  if (page && limit) {
    Post.find({})
      .populate("user") // Need to consider security in future.
      .populate({
        path: "bookings",
        match: { createdAt: { $gte: monthStart } },
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec(function (err, foundPosts) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        return res.json(foundPosts);
      });
  } else {
    Post.find({})
      // Post.find({shared: true})
      .populate("user") // Need to consider security in future.
      .populate({
        path: "bookings",
        match: { createdAt: { $gte: monthStart } },
      })
      .sort({ createdAt: -1 })
      .exec(function (err, foundPosts) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        return res.json(foundPosts);
      });
  }
};

exports.searchPosts = function (req, res) {
  const { searchWords } = req.params;

  Post.aggregate(
    [
      {
        $match: {
          postname: {
            $regex: searchWords,
            $options: "i",
          },
        },
      },
      { $sort: { createdAt: -1 } },
    ],
    function (err, foundPosts) {
      return res.json(foundPosts);
    }
  );
};

exports.getOwnerPosts = function (req, res) {
  const user = res.locals.user;
  const monthStart = moment()
    .tz("Asia/Tokyo")
    .startOf("month")
    .subtract(1, "month");

  Post.find({ user, isShared: true })
    .populate({
      path: "bookings",
      match: { createdAt: { $gte: monthStart } },
    })
    .sort({ createdAt: -1 })
    .exec(function (err, foundPosts) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundPosts);
    });
};

exports.deletePost = async function (req, res) {
  const postId = req.params.id;
  const user = res.locals.user;

  Post.findById(postId)
    .populate({
      path: "bookings",
      select: "start",
      match: {
        start: {
          $gt: moment.tz("Asia/Tokyo").startOf("month").subtract(11, "month"),
        },
      }, // &gt: greater than. <- Pick up 1 year reports.
    })
    .exec(async function (err, foundPost) {
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
      if (foundPost.bookings.length > 0) {
        return res.status(422).send({
          errors: {
            title: "Active reports!",
            detail: "一年以内のレッスン報告がある為削除できません",
          },
        });
      }

      try {
        foundPost.remove();
        await Booking.deleteMany({ post: postId });
        return res.json({ status: "deleted" });
      } catch (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
    });
};

exports.updatePost = function (req, res) {
  const postData = req.body;
  const { patientId } = req.body;
  const postId = req.params.id;
  const user = res.locals.user;

  Post.findById(postId)
    // .populate('user', '_id')
    .exec(function (err, foundPost) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      // if(foundPost.user.id !== user.id) {
      //     return res.status(422).send({errors: {title: "Invalid user!", detail: "You are not post owner!"}})
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
        postData.user = foundUser;

        try {
          const updatedPost = Post.updateOne(
            { _id: foundPost.id },
            postData,
            () => {}
          );
          return res.json(updatedPost);
        } catch (err) {
          return res.json(err);
        }
      });
    });
};

exports.createPost = function (req, res) {
  const post = new Post(req.body);
  post.user = res.locals.user;

  Post.create(post, function (err, newPost) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    User.updateOne(
      { _id: post.user.id },
      { $push: { posts: newPost } },
      function (err, result) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        return res.json(result);
      }
    );
  });
};
