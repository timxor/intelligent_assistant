// node convert_webm_to_m4a.js recordings/chrome_recording.webm


const ffmpeg = require('fluent-ffmpeg');

function convertWebmToM4a(inputPath, outputPath, callback) {
    ffmpeg(inputPath)
        .toFormat('mp4')
        .audioCodec('aac')
        .on('end', () => {
            console.log('Conversion finished.');
            callback(null);
        })
        .on('error', (err) => {
            console.error('Error:', err);
            callback(err);
        })
        .save(outputPath);
}

if (process.argv.length !== 3) {
    console.error("Usage: node convert.js <path_to_webm_file>");
    process.exit(1);
}

const inputFilePath = process.argv[2];
const outputFilePath = inputFilePath.replace('.webm', '.m4a');

convertWebmToM4a(inputFilePath, outputFilePath, (err) => {
    if (err) {
        console.error('Failed to convert:', err);
    } else {
        console.log('Conversion successful!');
    }
});
