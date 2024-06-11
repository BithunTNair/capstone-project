const mongoose = require('mongoose');

const courtSchema = mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String,
    },
    address1: {
        type: String,
    },
    address2: {
        type: String,
    },
    location: {
        type: String,
    },
    landmark: {
        type: String,
    },
    pin: {
        type: Number,
    },
    contactNumber: {
        type: Number,
    },
    description: {
        type: String,
    },
    courtPics: {
        type: Array,
    },
    rate:{
        type:Number,
        required:true
    },
    timeStamp: {
        type: Date,
        default: new Date(),
    },
    reviewId: {
        type: mongoose.Types.ObjectId,
        ref: 'reviews'
    }
});

const courts = mongoose.model('courts', courtSchema);
module.exports = courts;