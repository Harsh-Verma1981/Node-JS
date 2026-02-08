const express = require('express');
const userRouter = require('./routes/user');
const {connectMongoDb} = require('./connectDB');
const { logReqRes } = require('./middlewares/index');

const app = express();

// Middleware - Plugins
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt'));

const PORT = 8000;// Server's PORT no

// Connection of database ..
connectMongoDb('mongodb://127.0.0.1:27017/MyApp-Data');

// Routes
app.use('/users', userRouter);


app.listen(PORT, () => {
    console.log('Server Started !');
})

