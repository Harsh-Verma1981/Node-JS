// this is a math module made by me to use this in other files ..

const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    if(b === 0) {
        return `Error: ${b} cannot be zero`;
    }

    return a / b;
}

// Export this module to use in other files
module.exports = {
    add, subtract, multiply, divide,
    
}