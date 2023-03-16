const Review = require("./models/review");
const User = require("./models/user");
const Post = require("./models/post");
const Booking = require("./models/booking");
const { normalizeErrors } = require("./helpers/mongoose");
const moment = require("moment-timezone");

exports.getReviews = function (req, res) {
  const { postId } = req.query;

  Review.find({ post: postId })
    .populate("user", "-password")
    .sort({ cretatedAt: -1 })
    .exec((err, foundReviews) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundReviews);
    });
};

exports.getPostRating = function (req, res) {
  const postId = req.query.id;

  Review.aggregate(
    [
      { $unwind: "$post" },
      {
        $group: {
          _id: postId,
          ratingAvg: { $avg: "$rating" },
        },
      },
    ],
    function (err, result) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(result[0]["ratingAvg"]);
    }
  );
};

exports.createReview = async function (req, res) {
  const reviewData = req.body;
  const { postId } = req.query;

  try {
    const foundPost = await Post.findById(postId);
    reviewData.post = foundPost;
    const newReview = new Review(reviewData);
    const savedReview = await newReview.save();
    foundPost.reviews.push(savedReview);
    await foundPost.save();

    return res.json(savedReview);
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};
