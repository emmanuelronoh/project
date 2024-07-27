const nodemailer = require('nodemailer');
const emailWorker = require('../../workers/emailWorker');

jest.mock('nodemailer');

describe('Email Worker', () => {
  beforeEach(() => {
    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn().mockResolvedValue('Email sent')
    });
  });

  it('should send bulk emails correctly', async () => {
    const recipients = ['test1@example.com', 'test2@example.com'];
    await emailWorker.sendBulkEmail(recipients, 'Bulk Email Subject', 'Bulk email body');
    expect(nodemailer.createTransport).toHaveBeenCalled();
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledTimes(recipients.length);
  });
});
