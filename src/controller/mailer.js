const nodemailer = require("nodemailer");
require("dotenv").config();

// async..await is not allowed in global scope, must use a wrapper
async function main(user_email, mail_subject) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USR,
      pass: process.env.EMAIL_PASS,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: user_email ? user_email : "baz@example", // list of receivers
    subject: mail_subject ? mail_subject : "BTC Price Moved", // Subject line
    text: "BTC Price has moved against your limits", // plain text body
  });
}

main().catch(console.error);

module.exports = main;
