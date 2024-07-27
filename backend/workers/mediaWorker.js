const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Process media file
const processMedia = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .resize({ width: 800 }) // Resize image to width of 800px
      .toFile(outputPath);
    console.log(`Media processed: ${inputPath}`);
  } catch (error) {
    console.error(`Error processing media: ${error.message}`);
    throw error;
  }
};

// Example usage (could be replaced by job queue)
const main = async () => {
  const inputPath = path.join(__dirname, '../uploads/input.jpg');
  const outputPath = path.join(__dirname, '../uploads/output.jpg');
  await processMedia(inputPath, outputPath);
};

if (require.main === module) {
  main();
}

module.exports = { processMedia };
