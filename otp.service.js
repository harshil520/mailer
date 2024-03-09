const nodemailer = require('nodemailer');
const path = require('path');
const otpModel = require('./otp.model');
require("dotenv").config({ path: path.join(__dirname, "./.env") });

const sendOtp = (req, res) => {
    const { fromEmailID, toEmailID, subject } = req.body;
    let otp = Math.floor(1000 + Math.random() * 1000);

    let trasporter = nodemailer.createTransport({
        service: "email",
        host: "smtp.gmail.com",
        auth: {
            user: "harshilmalaviya520@gmail.com",
            pass: process.env.MAIL_APP_PASSWORD
        }
    });

    let mailOption = {
        from: fromEmailID,
        to: `${toEmailID}`,
        subject: subject,
        text: `This is your otp ${otp}.`
    };

    trasporter.sendMail(mailOption, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Otp sent on Email...");
        };
    });

    const OtpModel = new otpModel({ emailId: toEmailID, otp: otp });
    let save = OtpModel.save();

    setTimeout(async () => {
        let deleteOtp = await otpModel.findOneAndDelete({ otp: otp });
    }, 5 * 60 * 1000);

    if (save) {
        res.send({ message: "otp send successfully." });
    } else {
        res.send({ message: "otp is not sent." });
    }
};

const verifyOtp = async (req, res) => {
    const { emailID, otp } = req.body;
    let getData = await otpModel.findOneAndDelete({ emailId: emailID, otp: otp });
    if (getData) {
        res.send({ message: "otp verified." });
    } else {
        res.send({ message: "wrong otp" });
    }
};

module.exports = { sendOtp, verifyOtp };