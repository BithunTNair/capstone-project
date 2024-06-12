var express = require('express');
var router = express.Router();
const {Signup, Login, Signout}= require('../controllers/authController');
const { userAuth } = require('../middlewares/authorization');


router.post('/signup',userAuth, Signup );
router.post('/login',userAuth, Login );
router.post('/signout',userAuth,Signout);

module.exports = router;
