const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const mediaWorker = require('../../workers/mediaWorker');

describe('Media Worker', () => {
  const inputPath = path.join(__dirname, '../uploads/input.jpg');
  const outputPath = path.join(__dirname, '../uploads/output.jpg');

  beforeAll(() => {
    // Create a dummy input file
    return sharp({
      create: {
        width: 600,
        height: 400,
        channels: 3,
        background: 'blue'
      }
    }).toFile(inputPath);
  });

  afterAll(() => {
    // Clean up
    if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
  });

  it('should process media correctly', async () => {
    await mediaWorker.processMedia(inputPath, outputPath);

    // Check if output file exists
    expect(fs.existsSync(outputPath)).toBe(true);

    // Check if output file is an image
    const metadata = await sharp(outputPath).metadata();
    expect(metadata.width).toBe(800); // Expect width to be resized
  });
});
