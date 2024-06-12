var express = require('express');
const { orders, verification } = require('../controllers/paymentController');
const {sendBookingEmail}= require('../controllers/sendEmailController');
const { userAuth } = require('../middlewares/authorization');
var router = express.Router();


router.post('/orders',userAuth,orders);
router.post('/verify',verification,userAuth,sendBookingEmail);

module.exports = router;
