// understanding about Middlewares in express
// important topic in Express 

// we can create our own middleware

// it is a func which has acces of the req , res and next middleware(if exist) func.
// 1. it can execute the code 
// 2. make changes to req and res objects
// 3. end the req, res cycle 
// 4. call the next middleware in the stack

/* 
    In simple think middleware as a bouncer who can check ur id(check res and req) 
    if found anything wrong can told u to go back(decline ur req to go to server) 
    and if everthing is valid can send u to other checking gate or to party hall (send ur req, res to next middleware or to the server). 
*/

const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

// creating an app
const app = express();
const PORT = 8000;

// creating middleware 

// this middleware works by checking the header if the content-type is url based it will parse the data into my body ..
app.use(express.urlencoded({ extended : false }));

// my own middleware by using app.use
app.use((req, res, next) => {
    console.log('Hello from Custom Middleware.');
    // return res.json({msg : "Hello from middleware 1"});
    // req.myUserName = "HarshVerma.dev";
    next();
});

// app.use((req, res, next) => {
//     console.log('Hello from middleware 2.', req.myUserName);
//     // return res.end('Hey This is from middleware');
//     next();
// })

app.use((req, res, next) => {
    fs.appendFile('./Userlogin.txt', `\n${Date.now()}: ${req.ip}: ${req.method}: ${req.path}\n`, (err, data) => {
        next();
    })
})

// Routes

app.get('/', (req, res) =>{
    res.send('Hello Home Page!');
})


// Get all users (JSON)
app.get('/api/users', (req, res) => {
    // console.log('I am in get route', req.myUserName);
    // console.log(req.headers);
    // res.setHeader('UserName', 'Harsh Verma');

    // for custom header best practice is to pass this with X-{name of the header}
    res.setHeader('X-MyName', 'Harsh Verma');// custom header
    return res.json(users);
});

app.route('/api/users/:id')// GET user by ID
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if (!user) return res.status(404).json({ status: "User not found" });
        return res.json(user);
    })

    // PATCH (Update user data)
    .patch((req, res) => {
        const id = Number(req.params.id);
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ status: "User not found" });
        }

        // Update fields dynamically
        const updatedUser = { ...users[userIndex], ...req.body };
        users[userIndex] = updatedUser;

        // Write to JSON file
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: "error", message: "Failed to update file" });
            }
            return res.status(201).json({
                status: "success",
                message: `User with ID ${id} updated successfully`,
                user: updatedUser
            });
        });
    })

    // DELETE (Remove user)
    .delete((req, res) => {
        const id = Number(req.params.id);
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ status: "User not found" });
        }

        // Remove user from array
        users.splice(userIndex, 1);

        // Write updated array to file
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: "error", message: "Failed to update file" });
            }
            return res.status(201).json({
                status: "success",
                message: `User with ID ${id} deleted successfully`
            });
        });
    });

// POST (Add new user)
app.post('/api/users', (req, res) => {
    const body = req.body;
    console.log('Body: ', body);

    users.push({ ...body, id: users.length + 1 });

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: "error", message: "Failed to write file" });
        }
        return res.status(201).json({ status: "success", id: users.length });
    });
});

app.listen(PORT, () => {
    console.log('Server started!');
});

// Learning about http headers
// headers are key value pair that send along with http req and res carrying meta data(data over data) and control the info between client and server.
// Example :Think of a mailman having a mail which is a data but over this it has some important additional data like sender's address and receiver's address which is important(which is data over data or meta data)
// there are many built in headers but we can create our own headers acc to our usage ..
