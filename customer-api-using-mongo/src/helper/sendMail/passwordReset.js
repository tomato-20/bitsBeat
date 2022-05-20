const nodemailer= require('nodemailer');
const Mail = require('nodemailer/lib/mailer');
require('dotenv').config();

const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;


let receiverEmail = "programmer.anon.01@gmail.com";
let url = 'This is the reset url';


const sendResetMail = async (receiverEmail, url) => {

    const html = `<p> Please click the following link to reset your password</p>
    <p>${url}</p>
    <p>If you did not request password reset please ignore this mail</p>
`
    let mailOptions = {
        service: "gmail",
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASSWORD
        }   
    }

    try {
        let transporter = nodemailer.createTransport(mailOptions)
        let info = transporter.sendMail({
            from: "Customer app <mailermediator@gmail.com>",
            subject: "reset password",
            to: receiverEmail,
            html
        })

        console.log((await info).envelope);
        console.log('message sent');
        console.log(nodemailer.getTestMessageUrl(info))
        return 'Message sent'
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

module.exports = sendResetMail;

