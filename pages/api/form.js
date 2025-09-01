const sgMail = require('@sendgrid/mail');

const form = (req, res) => {
  const data = req.query;
  const value = JSON.stringify(data);
  // const value = decodeData.replace('url=', '').replace(/=/g, ': ').split('&').join(" <br> ");

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'dawa@selise.ch',
    from: 'dawadawa08@gmail.com', // Use the email address or domain you verified above
    subject: 'Sending with SendGrid is Fun',
    html: `<p>${value}</p>`,
  };
  //ES6
  sgMail.send(msg).then(
    (res) => {
      console.log('res', res);
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );

  res.statusCode = 200;
  res.json({ message: 'form submitted successfully' });
};

export default form;
