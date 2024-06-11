var express = require('express');
const { createReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { userAuth } = require('../middlewares/authorization');
var router = express.Router();


router.post('/reviewsandratings', createReview);
router.put('/reviewsandratings', updateReview);
router.delete('/reviewsandratings', deleteReview);
module.exports = router;
