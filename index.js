require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const transporter = require('./utils/nodemailer');

app.get('/:emailrecipient', async (req, res) => {
    const { emailrecipient } = req.params;

    transporter.sendMail({
        from: process.env.GMAIL_SENDER,
        to: emailrecipient,
        subject: "Nodemailer from gmail",
        text: "I hope this message gets through!",
        auth: {
            user: process.env.GMAIL_SENDER,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN,
            expires: 1484314697598,
        },
    });

    res.send(`Email sent to ${emailrecipient}!`);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})