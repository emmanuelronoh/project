const nodemailer = require('nodemailer');
const { emailConfig } = require('../config');

// Set up the email transporter
const transporter = nodemailer.createTransport(emailConfig);

// Send a bulk email
const sendBulkEmail = async (recipients, subject, text) => {
  try {
    await Promise.all(recipients.map((recipient) =>
      transporter.sendMail({
        from: 'no-reply@yourapp.com',
        to: recipient,
        subject,
        text
      })
    ));
    console.log(`Bulk email sent to: ${recipients.join(', ')}`);
  } catch (error) {
    console.error(`Error sending bulk email: ${error.message}`);
    throw error;
  }
};

// Example usage (could be replaced by job queue)
const main = async () => {
  const recipients = ['test1@example.com', 'test2@example.com'];
  await sendBulkEmail(recipients, 'Bulk Email Subject', 'Bulk email body');
};

if (require.main === module) {
  main();
}

module.exports = { sendBulkEmail };
