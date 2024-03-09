const { model, Schema } = require('mongoose');

const otpSchema = new Schema({
    emailId: {
        type: String,
    },
    otp: {
        type: String
    }
})

module.exports = model("otp", otpSchema);

