// this file is to understand file handling in node js
const fs = require('fs');// built-in module 

// write and creating a new file

// Syncronous way
fs.writeFileSync('./sample.txt', 'Hello, God! I am learning again');

// Asyncronous way
fs.writeFile('./read.txt', 'Hello, God! from async way', (err) => {
    if(err) {
        console.log(err);
        return;
    }
});

// reading a file 

// syncronous way
const data = fs.readFileSync('./sample.txt', 'utf-8');
console.log(data);

// Asyncronus way
const result = fs.readFile('./read.txt', 'utf-8', (err, data) =>  {
    if(err) {
        console.log(err);
        return;
    }

    console.log(data);
});

// appending data to a file

fs.appendFileSync('./sample.txt', '\nThis is my second number: +91 981099XXXX');

// Aysncronous way
fs.appendFile('./read.txt', '\nThis is my second number: +91 991095XXXX', (err) => {
    if(err) {
        console.log(err);
        return;
    }
});

