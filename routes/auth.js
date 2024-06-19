var express = require('express');
var router = express.Router();
const {Signup, Login, Signout}= require('../controllers/authController');



router.post('/signup', Signup );
router.post('/login', Login );
router.post('/signout',Signout);

module.exports = router;
