import express from "express";
import fs from "fs";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// Routes 
app.get('/', (req, res) => {
    res.send('Hello, Welcome to Homepage');
})

app.get('/search', (req, res) => {
    const query = req.query.name;
    console.log(req.query);
    res.send(`You have searched for ${query} at ${Date.now()}`);

})

app.get('/form', (req, res) => {
    res.sendFile(process.cwd() + '/Dummy.html');
});


app.post('/user', (req, res) => {
    const {name, email, gender} = req.body;

    if(name === '' || email === '' || gender === ''){
        return res.status(400).json({message : 'Please fill all details'});
    }

    res.status(201).json({message : 'Success!'});

})

// listener
app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
})