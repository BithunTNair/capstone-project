var express = require('express');
const { createReview, updateReview} = require('../controllers/reviewController');
const { userAuth } = require('../middlewares/authorization');
var router = express.Router();


router.post('/reviewsandratings',userAuth,  createReview);
router.put('/:reviewId', updateReview);

module.exports = router;
