// services/chatService.js

const Chat = require('../models/chatModel');
const User = require('../models/userModel');

// Send a message
const sendMessage = async (senderId, receiverId, message) => {
  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) throw new Error('User(s) not found');

    const chat = new Chat({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    await chat.save();
    return chat;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Get chat history between two users
const getChatHistory = async (userId1, userId2) => {
  try {
    const chats = await Chat.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    }).populate('sender', 'username').populate('receiver', 'username');

    return chats;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { sendMessage, getChatHistory };
