const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};

const nodemailer = require('nodemailer');
const querystring = require('querystring');

exports.handler = function (event, context, callback) {
  const data = event.rawQuery;
  const params = new URLSearchParams(data);

  //const decodeData = decodeURIComponent(data);
  // const value = decodeData.replace(/=/g,': ').split('&').join(" <br> ");
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  transporter.sendMail(
    {
      from: process.env.SMTP_SERVER_EMAIL_ADDRESS,
      replyTo: '',
      to: 'lessons@matchspace.com',
      // to: "marcin.antczak@naturaily.com",
      subject: `Search Request - ${params.get('Instrument')} ${params.get('Location')} - ${params.get('Email')}`,
      html: `
            <p>New search request received for:<br/>
            ${params.get('Instrument')}<br/>
            ${params.get('Location')}<br/>
            ${params.get('Source')}<br/>
            <br/>
            Message:<br/>
            ${params.get('FirstName')}<br/>
            ${params.get('LastName')}<br/><br/>
            ${params.get('Email')}<br/><br/>
            ${params.get('ZIP')}<br/><br/>
            ${params.get('Message')}<br/><p>

            <p>Automation</p>
            instrument$$$ ${params.get('Instrument')} $$$instrument
            custom-location$$$ ${params.get('Location')} $$$location
            custom-source$$$ ${params.get('Source')} $$$source
            firstname$$$ ${params.get('FirstName')} $$$firstname
            lastname$$$ ${params.get('LastName')} $$$lastname
            email$$$ ${params.get('Email')} $$$email
            zip$$$ ${params.get('ZIP')} $$$zip
            message$$$ ${params.get('Message')} $$$message
            `,
    },
    function (error) {
      if (error) {
        callback(error);
        headers;
      } else {
        callback(null, {
          statusCode: 200,
          headers,
          body: 'ok',
        });
      }
    }
  );
};
