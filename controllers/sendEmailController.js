const SENDGRID = require('@sendgrid/mail');
const { default: axios } = require('axios');

SENDGRID.setApiKey(process.env.SENDGRID_API_KEY);

const sendBookingEmail = (async (email, bookingDetails) => {
    const url = 'https://api.formget.com/mailget/sendMail'
    const payload = {
        from: 'react666cr@gmail.com',
        to: 'hydrafan236@gmail.com',
        subject: 'Booking Confirmation',
        // content: `Dear ${bookingDetails.firstName},\n\nYour booking is confirmed!\n\nDetails:\nCourt: ${bookingDetails.court}\nDate: ${bookingDetails.date}\n\nThank you for booking with us!`,
        content:'dear sir/madam',
        content_type: 'text/plain'

    }
    try {
        const response = await axios.post(url, payload);
        if (response.data.status === success) {
            console.log('email send successfully');
        } else {
            console.log('error occured', response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = { sendBookingEmail };