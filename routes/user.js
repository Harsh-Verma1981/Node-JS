const express = require('express');
const {
    handleGetUsers,
    handleGetUserById, 
    handleUpdateUserByID,
    handleDeleteUserByID,
    handleCreateNewUser,
} = require('../controllers/user');

const router = express.Router();


// router.get('/', (req, res) => {
//     res.send("Hello Homepage!");
// })

// router.get('/about', (req, res) => {
//     res.send('Hello from the about page!');
// })

// getting data in html res
// Get all users (HTML)
// router.get('/users', async(req, res) => {
//     const allUsers = await User.find({});// empty means to get all users
//     const html = `
//     <ul>
//         ${allUsers.map(user => `<li>Name: ${user.firstName} <br>Email: ${user.email}<br><br> </li>`).join('')}
//     </ul>
//     `;
//     res.send(html);
// });

router.route('/')// for get and post req for users
    .get(handleGetUsers)
    .post(handleCreateNewUser);

// Route
router.route('/:id')
    .get(handleGetUserById)
    // updating existing user details
    .patch(handleUpdateUserByID)
    .delete(handleDeleteUserByID);



module.exports = router;