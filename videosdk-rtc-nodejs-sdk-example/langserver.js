const express = require('express');
const translate = require('@vitalets/google-translate-api');
const app = express();

// Set up a route to handle incoming translation requests
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post('/translate', async(req, res) => {
    console.log('came for me..')
    try {
        const { text, targetLang } = req.body; // assuming the request body contains the text to translate and the target language
        const translation = await translate(text, { to: targetLang });
        res.send(translation.text);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error translating text');
    }
});

// Start the server
app.listen(3001, () => {
    console.log('Server listening on port 3001');
});