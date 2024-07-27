// controllers/chatController.js

const Chat = require('../models/chatModel');

// Create a chat
exports.createChat = async (req, res) => {
  const { participants, messages } = req.body;
  try {
    const newChat = new Chat({
      participants,
      messages,
    });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get chat history
exports.getChatHistory = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId).populate('participants', 'username');
    if (!chat) return res.status(404).json({ error: 'Chat not found' });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Chat = require('../models/chatModel');

exports.sendMessage = async (req, res) => {
    const { senderId, receiverId, message } = req.body;

    try {
        const chat = new Chat({ sender: senderId, receiver: receiverId, message });
        await chat.save();
        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
        const messages = await Chat.find({ chatId });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
