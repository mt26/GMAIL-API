const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const express = require('express');
const app=express()




// These id's and secrets should come from .env file.
const CLIENT_ID = '548601272484-i8sviaou77avgduvktlqbprfcggsrm8d.apps.googleusercontent.com';
const CLEINT_SECRET = 'Ho4xmO7CO1MlMjdsTl58Un5J';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//047OeHrgtEeXCCgYIARAAGAQSNwF-L9IrHZD5NdaB5kAQBnLAb6VP3gpMLN5BK7UzgFvC2QxXlQrABJxfDwZ9xc1MQKl7tUA0RWY';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });





async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'manntanwani@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
  

    const mailOptions = {
      from: ' MANNTANWANI <manntanwani@gmail.com>',
      to: 'conorthemma256@gmail.com',
      subject: 'Hello from gmail using API',
      text: 'Hello from gmail email using API',
      html: '<h1>Hello from gmail email using API</h1>',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}


sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));

  module.exports= sendMail;

