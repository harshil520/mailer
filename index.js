const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { Mailer } = require("./mailer");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send({ status: 200, message: 'Initial root for Mailer!!' });
});

app.post('/send', async (req, res) => {
    try {
        const { to, subject, htmlBody, email, passKey } = req.body;

        const mailer = new Mailer({
            email: email,
            passKey: passKey
        });

        if (!to || !subject || !htmlBody) {
            return res.status(400).send({ err: 'Missing required fields: to, subject, htmlBody.' });
        }

        const success = await mailer.sendMail({ to, subject, htmlBody });

        if (success) {
            res.status(200).send({ data: 'Email sent successfully' });
        } else {
            res.status(500).send({ err: 'Failed to send email' });
        }
    } catch (error) {
        res.status(500).send({ err: 'Something went wrong' });
    }

})

app.listen(process.env.PORT || 3000, () => {
    console.log("connection on PORT 3000");
});

module.exports = app;