
const Reviews = require('../models/reviewsModel');
const createReview = ((req, res, next) => {
    const { userId, courtId, comment, rating } = req.body;
    try {
        Reviews({
            userId: userId,
            courtId: courtId,
            comment: comment,
            rating: rating

        }).save()
            .then((response) => {
                res.status(200).json({ message: 'review added successfully',response })
            }).catch((err) => {
                res.status(500).json({ message: 'something went wrong' })
            })
    } catch (error) {
        console.log(error);
        next()
    }
});

const updateReview = (async (req, res) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    try {
        const editReview = await Reviews.findByIdAndUpdate(reviewId, { rating, comment }, { new: true });
        res.status(200).json({ message: 'review updated successfully' ,editReview});
    } catch (error) {
        res.status(500).json({ message: 'Failed to update review' });
    }
});

const deleteReview = (async (req, res) => {
    const { reviewId } = req.params;
    try {
        await Reviews.findByIdAndDelete('666878d73c92bda3814f3eae');
        res.status(200).json({ message: 'review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete review' });
    }
})
module.exports = { createReview, updateReview, deleteReview }