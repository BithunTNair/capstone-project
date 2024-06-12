var express = require('express');
var router = express.Router();

const getRecommendations= require('../controllers/recommendationsController');
const { userAuth } = require('../middlewares/authorization');

router.get('/recommendedcourts',userAuth,getRecommendations );

module.exports = router;