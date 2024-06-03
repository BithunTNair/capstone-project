var express = require('express');
const { createReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { userAuth } = require('../middlewares/authorization');
var router = express.Router();


router.post('/reviewsandratings', userAuth, createReview);
router.put('/reviewsandratings', userAuth, updateReview);
router.delete('/reviewsandratings',userAuth, deleteReview);
module.exports = router;
