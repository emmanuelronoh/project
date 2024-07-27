// // models/postModel.js

// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   content: { type: String, required: true },
//   media: [{ type: String }], // Array of media URLs
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Post', postSchema);

// models/postModel.js

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);
