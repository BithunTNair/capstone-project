var express = require('express');
const { sellerAuth } = require('../middlewares/authorization');
const { createCourtSchedule } = require('../controllers/sellerController');
var router = express.Router();


router.post('/createcourtschedules', sellerAuth,createCourtSchedule);

module.exports = router;
