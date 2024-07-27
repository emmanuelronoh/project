// // models/chatModel.js

// const mongoose = require('mongoose');

// const chatSchema = new mongoose.Schema({
//   participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
//   messages: [
//     {
//       sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//       content: { type: String, required: true },
//       timestamp: { type: Date, default: Date.now },
//     },
//   ],
// });

// module.exports = mongoose.model('Chat', chatSchema);

// models/chatModel.js

const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', ChatSchema);
