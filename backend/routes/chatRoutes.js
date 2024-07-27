// routes/chatRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  sendMessage,
  getChatHistory
} = require('../controllers/chatController');

// Send a message
router.post('/', authMiddleware, sendMessage);

// Get chat history
router.get('/:recipientId', authMiddleware, getChatHistory);

module.exports = router;
