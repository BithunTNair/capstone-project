var express = require('express');
const { userAuth } = require('../middlewares/authorization');
const { getAllCourtsData } = require('../controllers/userController');
var router = express.Router();

router.post('/getallcourtsdata',userAuth,getAllCourtsData);

module.exports = router;
