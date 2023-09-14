const Jimp = require('jimp');
const fs = require('fs');
const imageimg = document.getElementById('uploaded-file');

// Function to calculate Signal-to-Noise Ratio (SNR)
function calculateSNR(image) {
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  let signal = 0;
  let noise = 0;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
      const brightness = (pixel.r + pixel.g + pixel.b) / 3;
      signal += brightness;
    }
  }

  const averageBrightness = signal / (width * height);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
      const brightness = (pixel.r + pixel.g + pixel.b) / 3;
      noise += Math.pow(brightness - averageBrightness, 2);
    }
  }

  const meanSquareError = noise / (width * height);
  const snr = 10 * Math.log10((signal * signal) / (meanSquareError * width * height));
  return snr;
}

// Load the image
Jimp.read(imageimg)
  .then((image) => {
    // Calculate and write SNR to a text file
    const snr = calculateSNR(image);
    fs.writeFileSync('image-snr.txt', `Signal-to-Noise Ratio (SNR): ${snr.toFixed(2)} dB`);

    // Reduce color and normal noise
    image.quality(95); // Adjust the quality level as needed

    // Save the edited image
    const editedImageName = 'your-13-edited.jpg';
    image.write(editedImageName);
    console.log(`Edited image saved as ${editedImageName}`);
  })
  .catch((err) => {
    console.error(err);
  });
