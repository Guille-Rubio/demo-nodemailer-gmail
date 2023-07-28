## Nodemailer with Gmail

```bash
npm init -y
touch index.js .env .gitignore
npm i express nodemailer
mkdir utils
touch utils/nodemailer.js
```
Add [rules](https://github.com/github/gitignore/blob/main/Node.gitignore) to gitignore 

add start script
```json
"scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

```


.env
```
GMAIL_SENDER=
GMAIL_CLIENT_ID=
GMAIL_CLIENT_SECRET=
ACCESS_TOKEN=
REFRESH_TOKEN=
```

## Setting up Google Cloud Platform 

go to [GCP console](https://console.cloud.google.com/)

create new project -> `demo-nodemailer-gmail`

API & Services -> OAuth consent screen<br>
select External

click Create

Enter App name
support email

### Add scopes 

add `https://mail.google.com/` manually, update

save and continue

Add user (i.e. )


### Create OAuth credentials
on GCP console go to
1. Credentials -> Create credentials -> OAuth Client ID

2. select web application

3. JS authorised origins -> http://127.0.0.1:5000

4. Authorized redirect URIs -> https://developers.google.com/oauthplayground

5. Click create


## Get Tokens
1. go to https://developers.google.com/oauthplayground
2. go to the gear icon on the upper right
check `use your own OAuth credentials`
type in your app Client ID and Client Secret, and close this menu. 

3. Look for Gmail API v1, click on the toggle and check at least the first ("https://mail.google.com")

4. Click `Authorize API`

5. Click Exchange Authorization code for tokens

6. Save yor Refresh and Access tokens in your .env


## Add nodemailer

### Create transporter
in utils/nodemailer.js
```js
"use strict";
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "OAuth2",
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET
    }
});

module.exports = transporter;

```

### Send email

use the sendMail method of the transporter to send an email specifying auth credentials.

```js
transporter.sendMail({
        from: process.env.GMAIL_SENDER,
        to: emailrecipient,
        subject: "Nodemailer from gmail",
        text: "I hope this message gets through!",
        auth: {
            user: process.env.GMAIL_SENDER,//gmail address
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN,
            expires: 1484314697598,
        },
    });

```





run your app with `npm start` and visit your endpoint. 




Thanks to Alex: [How to send emails using NodeMailer, gmail and OAuth2](https://alexb72.medium.com/how-to-send-emails-using-a-nodemailer-gmail-and-oauth2-fe19d66451f9)