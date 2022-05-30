const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const credentials = {
    sendgridApiKey : process.env.SENDGRID_API_KEY,
    senderEmail : process.env.SENDER_EMAIL
};

/**
 * 
 * @param {Object} message 
 * @param {String} message.email
 * @param {String} message.subject  
 * @param {String} message.content  
 * @returns 
 */
const sendMail = async (message) => {
    const msg = {
        to : message.email,
        from: credentials.senderEmail,
        subject : message.subject,
        html: message.content
    }

    try {
        // set api key for sendgrid api
        sgMail.setApiKey(credentials.sendgridApiKey);

        // send mail
        const mailResponse = await sgMail.send(msg);
        return {
            success: true,
            content: mailResponse[0]
        }

    }catch(err) {
        console.log(err)
        return {
            success: false,
            message: err || err.message
        }
    }
}

module.exports = sendMail