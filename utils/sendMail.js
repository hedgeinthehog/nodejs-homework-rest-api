const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = ({ to, subject, text, html }) => {
  const msg = {
    to: 'micko.eleonora@gmail.com',
    from: "volikodokara@gmail.com",
    subject,
    text,
    html
  };
  console.log(msg);
  
  sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    throw error;
  })
}

module.exports = sendMail;

