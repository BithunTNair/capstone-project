var express = require('express');
const { userAuth } = require('../middlewares/authorization');
const { getAllCourtsData, getSingleCourtData, getSchedules, getReviews } = require('../controllers/userController');
var router = express.Router();

router.get('/getallcourtsdata',getAllCourtsData);
router.get('/getsinglecourtdata',getSingleCourtData);
router.get('/getreviews',getReviews);
router.get('/getschedules',getSchedules);



module.exports = router;
