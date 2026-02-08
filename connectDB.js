const mongoose = require('mongoose');

async function connectMongoDb(url) {
    // Connection of database ..
    // mongodb://127.0.0.1:27017/MyApp-Data
    mongoose.connect(url)
    .then(() => {
        console.log('MongoDB connected !');
    })
    .catch((err) => {
        console.log('Mongo Error!' , err);
    });
    
}

module.exports = {
    connectMongoDb,
} 