var express = require('express');
const { sellerAuth } = require('../middlewares/authorization');
const { createCourtSchedule, viewRates, generateBills } = require('../controllers/sellerController');
var router = express.Router();


router.post('/createcourtschedules', sellerAuth,createCourtSchedule);
router.get('/viewrates',viewRates);
router.post('/generatebill',sellerAuth,generateBills);



module.exports = router;
