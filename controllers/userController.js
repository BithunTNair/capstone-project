const COURT_SCHEMA = require('../models/courtModel');
const COURT_SCHEDULES = require('../models/courtSchedule');
const REVIEWS = require('../models/reviewsModel')
const objectId = require('mongoose').Types.ObjectId;

const getAllCourtsData = ((req, res, next) => {
    try {
        COURT_SCHEMA.find().then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err);
            next()
        })
    } catch (error) {

        console.log(error);

    }
})

const getSingleCourtData = (async (req, res, next) => {
    try {
        const courtData = await COURT_SCHEMA.findOne({ _id: req.query.courtId });
        res.status(200).json(courtData);
    } catch (error) {
        next()
    }
})

const getSchedules = (async(req, res, next) => {

    try {
      const slotData= await COURT_SCHEDULES.find()
      res.status(200).json(slotData)
    } catch (error) {
        console.log(error);
        next()
    }
})

const getReviews = (async (req, res) => {
    const { courtId } = req.params;
    try {
        const reviews = await REVIEWS.find({courtId}).populate('userId', 'firstName')
        res.status(200).json(reviews)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get reviews' })
    }
})


module.exports = { getAllCourtsData, getSingleCourtData, getSchedules, getReviews }