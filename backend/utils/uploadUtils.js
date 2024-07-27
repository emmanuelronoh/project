// Validate if a file is an image based on its MIME type
const isImageFile = (file) => {
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validMimeTypes.includes(file.mimetype);
  };
  
  // Get the file extension from a file name
  const getFileExtension = (filename) => {
    return filename.split('.').pop();
  };
  
  module.exports = { isImageFile, getFileExtension };
  