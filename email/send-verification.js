const nodemailer = require("nodemailer")

const emailSender = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.Email,
        pass: process.env.Email_App_Password
    }
})

