// Format a chat message
const formatMessage = (message) => {
    return `[Formatted]: ${message}`;
  };
  
  // Validate if a message length is acceptable
  const isMessageValid = (message) => {
    const MAX_LENGTH = 500;
    return message.length > 0 && message.length <= MAX_LENGTH;
  };
  
  module.exports = { formatMessage, isMessageValid };
  