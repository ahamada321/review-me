const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const placeSchema = new Schema({
    placeName: String,
    province: String,
    address: String,
    url: String,
    tel: Number,
    email: String,
    rating: Number,

    nearStation: [{ type: String }],
    tags: [{ type: String }],
    lat: Number,
    lng: Number
});

module.exports = mongoose.model('Place', placeSchema);
