// services/mediaService.js

const cloudinary = require('cloudinary').v2;
const { cloudinaryConfig } = require('../config/cloudinaryConfig');

// Configure Cloudinary
cloudinary.config(cloudinaryConfig);

const uploadMedia = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'pidon_app',
    });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getMedia = async (publicId) => {
  try {
    const result = await cloudinary.api.resource(publicId);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { uploadMedia, getMedia };
