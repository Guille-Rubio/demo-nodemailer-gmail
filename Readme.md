## Nodemailer with Gmail

```bash
npm init -y
touch index.js .env .gitignore
npm i express nodemailer
mkdir controllers utils
touch utils/nodemailer.js
```
add [rules](https://github.com/github/gitignore/blob/main/Node.gitignore) to gitignore 


index.js
```js


```

Setting up the account 

go to GCP console
create new project -> demo-nodemailer-gmail

API & Services -> OAuth consent screen
select External

NB! You should not use external user type in production without going through the audit. Until the project is in "testing" mode OAuth2 refresh tokens expire in 7 days. This means that registered users need to re-login after every 7 days to keep their connections active.

Create

App name
support email

Add scopes, 

add `https://mail.google.com/` manually, update

save and continue

Add user 


Email engine credentials
Credentiasl -> Create credentials -> OAuth Client ID
web application


JS authorised origins -> http://127.0.0.1:5000

Authorized redirect URIs -> https://developers.google.com/oauthplayground

create

go to https://developers.google.com/oauthplayground

Add playground