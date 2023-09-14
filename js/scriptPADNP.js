document.addEventListener("DOMContentLoaded", function () {
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

    document.getElementById("process-button").addEventListener("click", function () {
        const fileInput = document.getElementById("uploaded-file");
        if (fileInput.files.length > 0) {
            const uploadedFile = fileInput.files[0];
            Jimp.read(uploadedFile)
                .then((image) => {
                    const snr = calculateSNR(image);
                    fs.writeFileSync('image-snr.txt', `Signal-to-Noise Ratio (SNR): ${snr.toFixed(2)} dB`);

                    image.quality(95);

                    const editedImageName = 'your-edited-image.jpg';
                    image.write(editedImageName);
                    console.log(`Edited image saved as ${editedImageName}`);

                    const downloadImageLink = document.getElementById("download-image-link");
                    downloadImageLink.style.display = "block";
                    downloadImageLink.href = editedImageName;

                    const downloadSnrLink = document.getElementById("download-snr-link");
                    downloadSnrLink.style.display = "block";
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    });
});
