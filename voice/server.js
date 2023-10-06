const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

app.use(express.static('public')); 

app.post('/upload', upload.single('audio'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const inputFilePath = req.file.path;
    const outputFilePath = inputFilePath + '.m4a';

    ffmpeg()
        .input(inputFilePath)
        .toFormat('m4a')
        .on('end', () => {
            console.log('Conversion finished.');
            fs.unlinkSync(inputFilePath);
            res.download(outputFilePath, (err) => {
                if (!err) fs.unlinkSync(outputFilePath);
            });
        })
        .on('error', (err) => {
            console.error('Error:', err);
            fs.unlinkSync(inputFilePath);
            res.status(500).send('Error during conversion.');
        })
        .save(outputFilePath);
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
