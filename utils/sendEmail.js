const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  // You can switch this config to Gmail, SendGrid, etc.
  // Looking to send emails in production? Check out our Email API/SMTP product!
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Hasan Medics" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  };

  const info = await transport.sendMail(mailOptions);
  console.log(`Email sent: ${info.messageId}`);
};

module.exports = sendEmail;
