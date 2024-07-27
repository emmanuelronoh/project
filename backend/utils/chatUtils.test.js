const chatUtils = require('../../utils/chatUtils');

describe('Chat Utils', () => {
  it('should format a message correctly', () => {
    const message = 'Hello, world!';
    const formattedMessage = chatUtils.formatMessage(message);

    expect(formattedMessage).toBe(`<p>${message}</p>`);
  });

  it('should handle empty messages', () => {
    const message = '';
    const formattedMessage = chatUtils.formatMessage(message);

    expect(formattedMessage).toBe('<p></p>');
  });
});
