var express = require('express');
var router = express.Router();
const {doSignup, doLogin}= require('../controllers/authController');


router.post('/dosignup', doSignup );
router.post('/dologin', doLogin );

module.exports = router;
