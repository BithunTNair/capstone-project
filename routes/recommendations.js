var express = require('express');
var router = express.Router();

const {getRecommendations}= require('../controllers/recommendationsController');
router.get('/recommendedcourts',getRecommendations);

module.exports = router;

