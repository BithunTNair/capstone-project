const sndGrid = require('@sendgrid/mail');

sndGrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendBookingEmail = (async (email, bookingDetails) => {

    try {
        const message = {
            to: email,
            from: 'hydrafan236@gmail.com',
            subject: "Booking Confirmation",
            text: `Dear ${bookingDetails.firstName},\n\nYour booking is confirmed!\n\nDetails:\nCourt:${bookingDetails.court}\nDate:${bookingDetails.date}\n\nThank you for booking with us!  `
        };
        await sndGrid.send(message);
        console.log('Email sent successfully');
    } catch (error) {
        console.log(error);
    }
});

module.exports = { sendBookingEmail }