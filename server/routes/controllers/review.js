const Review = require('./models/review')
const User = require('./models/user')
const Rental = require('./models/rental')
const Booking = require('./models/booking')
const { normalizeErrors } = require('./helpers/mongoose')
const moment = require('moment-timezone')


exports.getReviews = function(req, res) {
    const { rentalId } = req.query

    Review.find({'rental': rentalId})
            .populate('user', '-password')
            .sort({ "cretatedAt": -1})
            .limit(3)
            .exec((err, foundReviews) => {

                if(err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)})
                }
                return res.json(foundReviews)
            })
}

exports.getRentalRating = function(req, res) {
    const rentalId = req.query.id

    Review.aggregate([
        {"$unwind": "$rental"},
        {"$group": {
            "_id": rentalId, 
            "ratingAvg": {"$avg": "$rating"}
        }}
    ], function(err, result) {
        if(err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)})
        }
        return res.json(result[0]["ratingAvg"])
    })
}

exports.createReview = function(req, res) {
    const reviewData = req.body
    const { bookingId } = req.query
    const user = res.locals.user

    Booking.findById(bookingId)
            .populate({path: 'rental', populate: {path: 'user'}})
            .populate('review')
            .populate('user')
            .exec(async(err, foundBooking) => {

                if(err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)})
                }

                if(foundBooking.rental.user.id === user.id) {
                    return res.status(422).send({
                        errors: {
                            title: "Invalid user!",
                            detail: "Can not review on your rental!"
                        }
                    })
                }

                if(foundBooking.user.id !== user.id) {
                    return res.status(422).send({
                        errors: {
                            title: "Invalid user!",
                            detail: "Can not review other users booking!"
                        }
                    })
                }

                const timeNow = moment()
                const endAt = moment(foundBooking.endAt)
                if(!endAt.isBefore(timeNow)) {
                    return res.status(422).send({
                        errors: {
                            title: "Invalid date!",
                            detail: "You can review after finished service!"
                        }
                    })
                }

                if(foundBooking.review) {
                    return res.status(422).send({
                        errors: {
                            title: "Review error!",
                            detail: "You cannot review twice for same booking!"
                        }
                    })
                }

                const review = new Review(reviewData)
                review.user = user
                review.rental = foundBooking.rental
                foundBooking.review = review

                try {
                    await foundBooking.save()
                    const savedReview = await review.save()

                    return res.json(savedReview)
                } catch(err) {
                    return res.status(422).send({errors: normalizeErrors(err.errors)})
                }
            })
}