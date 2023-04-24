// const sendGridAPIKey = process.env.SG_API_KEY;
// const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(sendGridAPIKey);

// const email = {
//   to: '{{email}}',
//   from: '{{email}}',
//   subject: 'Test email from node.js',
//   text: 'I am testing sending emails from node js app'
// };

// (async () => {
//   try {
//     await sgMail.send(email);
//     console.log('Email sent');
//   } catch (error) {
//     console.log(error);

//     if (error.response) {
//       console.log(error.response.body);
//     }
//   }
// })();

const nodemailer = require('nodemailer');

const sendWelcomeEmail = async (email, name) => {
  let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
          user: process.env.SMTP_USER, // generated ethereal user
          pass: process.env.SMTP_PASS // generated ethereal password
      }
  });

  let mailOptions = {
    from: '"Oleh"', // sender address
    to: email,
    subject: `Hello ${name} from Node.js`, // Subject line
    text: 'Hello world', // plain text body
    html: '<b>Hello world</b>' // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

const sendCancelationEmail = async (email, name) => {
  let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
          user: process.env.SMTP_USER, // generated ethereal user
          pass: process.env.SMTP_PASS // generated ethereal password
      }
  });

  let mailOptions = {
    from: '"Oleh"', // sender address
    to: email,
    subject: `It is a pity you leave, ${name}`, // Subject line
    text: 'Good bye world', // plain text body
    html: '<b>Good bye world</b>' // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}