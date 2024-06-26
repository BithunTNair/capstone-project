const USERS = require('../models/userModel');

const COURT_SCHEMA = require('../models/courtModel');

const getRecommendations = (async (req, res) => {
    try {
       
        const user = await USERS.findById(req.userId);
        if (!user) {
            res.status(404).json({ message: 'user not found' })
        }
        const preferences = user.preferences;
        if (preferences.length === 0) {
            res.status(404).json({ message: 'no preferences' })
        }
        const recommendedCourts = await COURT_SCHEMA.find({ type: { $in: preferences } });
        res.status(200).json({ recommendations: recommendedCourts })
    } catch (error) {
       
        res.status(500).json({ message: 'something went wrong' });
        console.log(error);
    }
});
module.exports =   getRecommendations;