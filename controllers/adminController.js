const COURT_SCHEMA = require('../models/courtModel');
const COURTSCHEDULES = require('../models/courtSchedule');

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
            rate,
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
            rate,
            courtPics: pics


        }).save().then((response) => {
            res.status(200).json({ message: 'court added successfully' ,response})
        }).catch((err) => {
            res.status(500).json({ message: 'something went wrong' })
        })



    } catch (error) {
        console.log(error);
    }
}

const createCourtSchedule = (req, res) => {
    try {
        const { startDate, endDate, courtId, cost, selectedSlots } = req.body;
        if (!startDate || !endDate || !courtId || !cost || !selectedSlots) {
            res.status(400).json({ message: 'invalid input' })
        } else {
            let currentDate = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0))
            let lastDate = new Date(new Date(endDate).setUTCHours(0, 0, 0, 0))
            const slotObjects = [];
            while (currentDate <= lastDate) {
                for (let data of selectedSlots) {
                    slotObjects.push(
                        {
                            date: JSON.parse(JSON.stringify(currentDate)),
                            slot: {
                                name: data.name,
                                id: data.id,

                            },
                            cost,
                            courtId

                        }
                    )

                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
            console.log(slotObjects);
            COURTSCHEDULES.insertMany(slotObjects).then((response) => {
                res.status(200).json({ message: 'court was scheduled' ,response});
            }).catch((err) => {
                if (err.code === 11000) {
                    res.status(500).json({ message: 'this slot is already scheduled' });
                } else {
                    res.status(500).json({ message: 'something went wrong' });
                }
            })

        }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { createnewcourt, createCourtSchedule };