var express = require('express');
var router = express.Router();
const {doSignup}= require('../controllers/authController');


router.post('/dosignup', doSignup );
router.post('/dologin', doSignup );

module.exports = router;
