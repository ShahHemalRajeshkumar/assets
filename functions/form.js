const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};

const nodemailer = require('nodemailer');

exports.handler = function (event, context, callback) {
  const data = event.rawQuery;
  const decodeData = decodeURIComponent(data);
  const value = decodeData.replace(/=/g, ': ').split('&').join(' <br> ');
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
      to: 'customer.service@matchspace.com',
      subject: 'Contact request received',
      html: `<p>${value}<p>`,
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
