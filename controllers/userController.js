const COURT_SCHEMA = require('../models/courtModel')

const getAllCourtsData = (req, res, next) => {
    try {
        COURT_SCHEMA.find().then((result) => {
            result.status(200).json(result)
        }).catch((err) => {
            console.log(err);
            next()
        })
    } catch (error) {
        next()

    }
}

module.exports = { getAllCourtsData }