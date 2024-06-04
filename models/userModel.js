const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    role: {
        type: Number,
        default: 3
        // 1 admin
        // 2 seller
        // 3 user
    },
    active: {
        type: Boolean,
        default: true
    },
    preferences: {
        type: [String],
        default: []
    },
    pastBookings: [
        {
            courtId: {
                type: mongoose.Types.ObjectId,
                ref: 'courts'
            },
            date: Date,
            time: String
        }
    ]
});

const users = mongoose.model('users', userSchema);
module.exports = users;