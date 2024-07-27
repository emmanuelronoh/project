// controllers/mediaController.js

const Media = require('../models/mediaModel');
const { uploadMedia } = require('../utils/uploadUtils');

// Upload media
exports.uploadMedia = async (req, res) => {
  try {
    const media = await uploadMedia(req.file);
    const newMedia = new Media({
      user: req.user.id,
      url: media.url,
      type: media.type,
    });
    await newMedia.save();
    res.status(201).json(newMedia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get media
exports.getMedia = async (req, res) => {
  try {
    const media = await Media.find({ user: req.user.id });
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
