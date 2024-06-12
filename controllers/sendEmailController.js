
const mailgun = require('mailgun-js');
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

const sendBookingEmail = (async (email, bookingDetails) => {
    const data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: email,
        subject: 'Booking Confirmation',
        text: `Dear ${bookingDetails.firstName},\n\nYour booking is confirmed!\n\nDetails:\nCourt:${bookingDetails.court}\nDate:${bookingDetails.date}\n\nThank you for booking with us!`
    }
    try {
        await mg.messages().send(data)
        console.log('mail sent successfully', data);
    } catch (error) {
        console.log(error);
    }
});

module.exports = { sendBookingEmail };