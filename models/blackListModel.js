const mongoose = require('mongoose');

const blackListSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true

    }
});
const blackList = mongoose.model('blackList', blackListSchema);
module.exports = blackList