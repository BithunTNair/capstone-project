const ORDERS = require('../models/ordersModel');
const COURT_SCHEDULES = require('../models/courtSchedule');
const { sendBookingEmail } = require('./sendEmailController');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const USERS = require('../models/userModel');



const orders = (async (req, res) => {
    try {
        const slotData = await COURT_SCHEDULES.find({ _id: { $in: req.body.slotIds } });
        let totalCost = null;
        for (let slot of slotData) {
            if (slot.bookedBy) {
                res.status(400).json({ message: 'slot was occupied by someone' })
            } else {
                totalCost += slot.cost
            }
        }
        const instance = new Razorpay({
            key_id: process.env.RP_KEY_ID,
            key_secret: process.env.RP_SECRET_KEY,
        });

        const newOrder = await ORDERS({
            courtId: req.body.courtId,
            slotIds: req.body.slotIds,
            bookedBy: req.userId,
            totalCost: totalCost
        }).save()
        const options = {
            amount: totalCost * 100,
            currency: "INR",
            receipt: newOrder._id.toString(),
        };


        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.status(200).json(order);

    } catch (error) {
        console.log(error);
    }
})

const verification = (async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            courtId,
            slotIds,
            receipt,
            date
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", process.env.RP_SECRET_KEY);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");
        console.log(digest);

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });
        await COURT_SCHEDULES.updateMany({ _id: { $in: slotIds } }, { $set: { bookedBy: req.userId, orderId: receipt } });
        await ORDERS.updateOne({ _id: receipt }, { $set: { status: 2, bookedBy: req.userId, courtId: courtId, date: new Date(date) } })
        
        const users = await USERS.findById('665186334e2edc07aea6e461');
        if (!users) {
            res.status(404).json({ message: 'user not found' })
        };
        const bookingDetails = {
            firstName: users.firstName,
            court: courtId,
            date: date
        };

        await sendBookingEmail(users.email, bookingDetails)

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "Your booking was completed successfully",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
      
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});


module.exports = { orders, verification }