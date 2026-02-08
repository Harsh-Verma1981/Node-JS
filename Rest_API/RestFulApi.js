// const express = require('express');
// const users = require('./MOCK_DATA.json');
// const fs = require('fs');
// const { json } = require('stream/consumers');

// // creating an app 
// const app = express();

// const PORT = 8000;

// //Middleware - Plugin
// // this middleware help me to push my data into the body coming from the post request
// // app.use(express.json());
// app.use(express.urlencoded({ extended :  false }));

// // Routers 
// app.get('/', (req, res) => {
//     res.send('Hello, HomePage ');
// })

// app.get('/api/users', (req, res) => {
//     return res.json(users);
// })

// app.get('/users', (req, res) => {
//     const html = 
//     `
//     <ul>
//         ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
//     </ul>
//     `;

//     res.send(html);
// })

// app.route('/api/users/:id')
// .get((req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);

//     return res.json(user);
// })
// .patch((req, res) => {
//     // Edit the user details
//     const user_id = Number(req.params.id);
//     const find_id = users.find((user) => user.id === id);

//     const update = req.body;// eg email: 'example@email.com'

//     return res.json({status : "pending"});
// })
// .delete((req, res) => {
//     return res.json({status : "deleted"});
// })

// app.post('/api/users', (req, res) => {
//     const body = req.body;
//     console.log('Body: ', body);
    
//     users.push({...body, id: users.length + 1});

//     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
//         return res.json({status : "success", id: users.length });
//     });

// })

// // Starting the server..
// app.listen(PORT, () => {
//     console.log(`Server Started! `);
// })


const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json()); // Important for PATCH body
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello, HomePage');
});

// Get all users (JSON)
app.get('/api/users', (req, res) => {
    return res.json(users);
});

// Get all users (HTML)
app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});

// Chained route for single user operations
app.route('/api/users/:id')
    // GET user by ID
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
