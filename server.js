const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Contact message from ${name} (${email}): ${message}`);
    res.send('Thank you for contacting us!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
