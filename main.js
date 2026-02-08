// this is the first file to learn Node.js 

// hello world program
console.log("Hello, World!");

// Modules in Node.js

// customised module
const math = require('./Math');

// built-in modules
const fs = require('fs');

// Using the math module
const resultAdd = math.add(12, 7);
console.log(resultAdd);

const resSubtract = math.subtract(115, 25);
console.log(resSubtract);

const resMultiply = math.multiply(5, 6);
console.log(resMultiply);

const resDivide = math.divide(20, 4);
console.log(resDivide);

// types of modules in node js
// built in modules
const os = require('os');

// local modules 
// made by me like this math module

// third party modules
// use or download from npm registry like express or react 

