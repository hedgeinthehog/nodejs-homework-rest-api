const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = ({ to, subject, text, html }) => {
  console.log(to);
  const msg = {
    to,
    from: "volikodokara@gmail.com",
    subject,
    text,
    html
  };

  return sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      throw new Error(error);
    })
}

module.exports = sendMail;

