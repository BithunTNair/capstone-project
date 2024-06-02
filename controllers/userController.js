const COURT_SCHEMA = require('../models/courtModel');
const COURT_SCHEDULES = require('../models/courtSchedule');
const REVIEWS= require('../models/reviewsModel')
const objectId = require('mongoose').Types.ObjectId;

const getAllCourtsData = ((req, res, next) => {
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
})

const getSingleCourtData = (async (req, res, next) => {
    try {
        const courtData = await COURT_SCHEMA.findOne({ _id: req.query.courtId });
        res.status(200).json(courtData);
    } catch (error) {
        next()
    }
})

const getSchedules = ((req, res,next) => {
    let currentHour = 0
    let currentDate = new Date(req.query.date)
    if (new Date(new Date().setUTCHours(0, 0, 0, 0)) === currentDate) {
        currentHour = new Date().getHours()
    }
    COURT_SCHEDULES.aggregate([{
        $match: {
            courtId: new objectId(req.query.courtId),
            date: currentDate,
            'slot.id': { $gte: currentHour }
        }

    },
    {
        $project: {
            _id: 1, date: 1, slot: 1, cost: 1, bookedBy: 1
        }
    }

    ]).then((result) => {
        console.log(result);
        res.status(200).json(result)
    })

    try {

    } catch (error) {
        console.log(error);
        next()
    }
})

const getReviews=(async(req,res)=>{
    const {courtId}=req.params;
    try {
        const reviews= await REVIEWS.find({courtId}).populate('userId','firstName')
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({message:'Failed to get reviews'})
    }
})


module.exports = { getAllCourtsData, getSingleCourtData, getSchedules,getReviews }