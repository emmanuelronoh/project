// // models/mediaModel.js

// const mongoose = require('mongoose');

// const mediaSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   url: { type: String, required: true },
//   type: { type: String, required: true }, // e.g., image, video
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Media', mediaSchema);

// models/mediaModel.js

const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  publicId: {
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

module.exports = mongoose.model('Media', MediaSchema);
