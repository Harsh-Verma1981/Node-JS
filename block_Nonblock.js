// importing fs module
const fs = require('fs');
const os = require('os');

// Blocking ...
// console.log('1');

// // In the blocking scope this function will block the execution of other lines which makes our program slow and unresponsive
// const data = fs.readFileSync('./read.txt', 'utf-8');
// console.log(data);

// console.log('2');
// console.log('3');

// Non-Blocking ...
console.log('A');
// In the non-blocking scope this function will not block the execution of other lines which makes our program fast and responsive
fs.readFile('./read.txt', 'utf-8', (err, data) => {
    if(!err){
        console.log(data);
    }
})

console.log('B');
console.log('C');

// Default Thread pool size is 4 used by blocking I/O operations
console.log(os.cpus().length);

