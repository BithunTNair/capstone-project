var express = require('express');
const { orders, verification } = require('../controllers/paymentController');
const {sendBookingEmail}= require('../controllers/sendEmailController');
const { userAuth } = require('../middlewares/authorization');
var router = express.Router();


router.post('/orders',orders);
router.post('/verify',verification,sendBookingEmail);

module.exports = router;
