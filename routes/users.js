var express = require('express');
const { userAuth } = require('../middlewares/authorization');
const { getAllCourtsData, getSingleCourtData, getSchedules } = require('../controllers/userController');
var router = express.Router();

router.get('/getallcourtsdata',userAuth,getAllCourtsData);
router.get('/getsinglecourtdata',userAuth,getSingleCourtData);
router.get('/getschedules',userAuth,getSchedules);

module.exports = router;
