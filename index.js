const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const otpRoute = require('./otp.route');

require("dotenv").config({ path: path.join(__dirname, "./.env") });

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json("Initial root for Mailer.");
});

app.use("/otp", otpRoute);

mongoose.connect(process.env.DATABSE_CONNECTION).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("connection on PORT ", process.env.PORT);
        console.log("Mongo DB connect");
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB : ', error);
});