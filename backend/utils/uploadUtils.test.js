const uploadUtils = require('../../utils/uploadUtils');
const path = require('path');

describe('Upload Utils', () => {
  it('should return the correct file extension', () => {
    const filePath = 'images/photo.jpg';
    const extension = uploadUtils.getFileExtension(filePath);

    expect(extension).toBe('jpg');
  });

  it('should validate file types correctly', () => {
    const validFileType = 'image/jpeg';
    const invalidFileType = 'text/plain';

    expect(uploadUtils.isValidFileType(validFileType)).toBe(true);
    expect(uploadUtils.isValidFileType(invalidFileType)).toBe(false);
  });
});
