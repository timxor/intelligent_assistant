const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());


/* main page
***************************/


// Serve static files like CSS, JS, and images
app.use(express.static(path.join(__dirname, 'public')));

const saveRecording = () => {
    const blob = new Blob(recordedChunks, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append('audio', blob);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'converted.m4a';
        a.click();
    });
};


// // Serve the index.html file for the root path
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// 
// 
// app.post('/ask', (req, res) => {
//     const userQuery = req.body.query;
// 
//     // Here, you can add your logic to process the query and generate a response.
//     // For this example, I'll just echo back the query.
//     const response = `You asked: ${userQuery}`;
// 
//     res.json({ response });
// });


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


