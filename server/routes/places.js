const express = require('express')
const router = express.Router()

const PlaceCtrl = require('./controllers/place')


router.get('', PlaceCtrl.getPlacesFrom)

// router.get('', PlaceCtrl.getPlacesByBookingId)


module.exports = router