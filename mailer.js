const nodemailer = require('nodemailer');

class Mailer {
    constructor({ email, passKey }) {
        this.email = email;
        this.passKey = passKey;
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            auth: {
                user: email,
                pass: passKey,
            },
        });
    }

    async sendMail({ to, subject, htmlBody }) {
        try {
            const mailOptions = {
                from: this.email,
                to,
                subject,
                text: '',
                html: htmlBody,
            };

            const result = await this.transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = { Mailer };