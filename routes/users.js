var express = require('express');
const { userAuth } = require('../middlewares/authorization');
const { getAllCourtsData, getSingleCourtData, getSchedules, getReviews } = require('../controllers/userController');
const { getPastBooking } = require('../controllers/getPastBookingController');
var router = express.Router();

router.get('/getallcourtsdata',userAuth,getAllCourtsData);
router.get('/getsinglecourtdata',userAuth,getSingleCourtData);
router.get('/getreviews',userAuth,getReviews);
router.get('/getschedules',userAuth,getSchedules);
router.get('/getpastbooking',userAuth,getPastBooking);



module.exports = router;
