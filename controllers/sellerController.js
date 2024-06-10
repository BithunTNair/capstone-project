const COURT_SCHEMA = require('../models/courtModel'); 
const ORDERS = require('../models/ordersModel');

const createCourtSchedule = (req, res) => {
    try {
        const { startDate, endDate, courtId, cost, selectedSlots } = req.body;
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
            res.status(200).json({ message: 'court was scheduled' })
        }).catch((err) => {
            if (err.code === 11000) {
                res.status(500).json({ message: 'this slot is already scheduled' });
            } else {
                res.status(500).json({ message: 'something went wrong' });
            }
        })

    } catch (error) {
        console.log(error);
    }
};

const viewRates=(async(req,res)=>{
    try {
        const rates= await COURT_SCHEMA.find({},'name type rate');
        res.status(200).json(rates);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'something went wrong'})
    }
});

const generateBills= (async(req,res)=>{
    const {orderId}= req.body;
    try {
        const booking= await ORDERS.findById(orderId).populate('courtId slotIds bookedBy');
        if(!booking){
            res.status(404).json({message:'booking not found'})
        }else{
            const billDetails= {
                bookingId:booking._id,
                courtName:booking.courtId.name,
                user: `${booking.bookedBy.firstName} ${booking.bookedBy.lastName}`,
                date:booking.slotDate,
                totalCost:booking.totalCost
            }
            res.status(200).json(billDetails)
        }
    } catch (error) {
        res.status(500).json({message:'something went wrong'})
    }
})
module.exports = { createCourtSchedule , viewRates,generateBills};