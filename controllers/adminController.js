const COURT_SCHEMA = require('../models/courtModel');

const createnewcourt = (req, res) => {
    try {
        const {
            name,
            location,
            type,
            address2,
            address1,
            landMark,
            pin,
            contactNumber,
            description
        } = req.body;
        const pics = req.files.map((file) => { return { name: file.filename, type: file.mimetype } });
        COURT_SCHEMA({
            name: name,
            location,
            type,
            address2,
            address1,
            landMark,
            pin,
            contactNumber,
            description,
            courtPics: pics


        }).save().then((response) => {
            res.status(200).json({ message: 'court added successfully' })
        }).catch((err) => {
            res.status(500).json({ message: 'something went wrong' })
        })



    } catch (error) {
        console.log(error);
    }
}

module.exports = { createnewcourt };