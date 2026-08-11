const nodemailer = require("nodemailer")

const emailSender = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.Email,
        pass: process.env.Email_App_Password
    }
})

const sendVerificationCode = async (email, code) => {
    const emailMessage = {
        from: process.env.Email,
        to: email,
        subject: "Tharwah verification code",
        text: `Your verification code is ${code}`
    }
    await emailSender.sendMail(emailMessage)
}

module.exports = sendVerificationCode