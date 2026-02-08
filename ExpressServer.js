// This server is made using express framework ..
const express = require('express');
// const http = require('http');

// creating an app
const app = express();

// starting server
app.get('/', (req, res) => {
    return res.send('Hello, HomePage from the Express!');
})

app.get('/about', (req, res) => {
    return res.send(`Hello, ${req.query.name} and his age is ${req.query.age}`);
})

// lisening the server on the PORT no 8000
app.listen(8000, () => {
    console.log('Server Started!');
})

// const server = http.createServer(app);

// server.listen(8000, () => {
//     console.log('Server Started!');
// })