const ORDERS = require('../models/ordersModel');

const getPastBooking=async(req,res)=>{
    try {
        const userId= req.userId;
        const pastBookings= await ORDERS.find({bookedBy:userId,status:2}).populate('courtId','name location').populate({
            path:'slotIds',
            select:'startTime endTime'
        });

        res.status(200).json(pastBookings)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong"})
    }
}
module.exports={getPastBooking}