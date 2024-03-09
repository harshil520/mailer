const { Router } = require('express');
const otpRouter = Router();
const otpService = require("./otp.service");

otpRouter.get('/', (req, res) => {
    res.status(200).json({ message: "Otp Route is working !!" });
});

otpRouter.post('/sendOtp', otpService.sendOtp);
otpRouter.post('/verifyOtp', otpService.verifyOtp);

module.exports = otpRouter;