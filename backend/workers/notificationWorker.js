const nodemailer = require('nodemailer');
const notificationWorker = require('../../workers/notificationWorker');

jest.mock('nodemailer');

describe('Notification Worker', () => {
  beforeEach(() => {
    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn().mockResolvedValue('Email sent')
    });
  });

  it('should send notification email correctly', async () => {
    await notificationWorker.sendNotification('test@example.com', 'Test Subject', 'Test email body');
    expect(nodemailer.createTransport).toHaveBeenCalled();
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith({
      from: 'no-reply@yourapp.com',
      to: 'test@example.com',
      subject: 'Test Subject',
      text: 'Test email body'
    });
  });
});
