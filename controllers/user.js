const User = require('../models/user');

async function handleGetUsers(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ status: "User not found" });
    return res.json(user);
}

async function handleUpdateUserByID(req, res) {
    await User.findByIdAndUpdate(req.params.id, { lastName : 'Rock' });
    return res.json({status : 'Success'});
}

async function handleDeleteUserByID(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({message : `${req.params.id} deleted successfully from database`});
}

async function handleCreateNewUser(req, res) {
    const body = req.body;

    // console.log(body);

    if(!body.firstName || !body.JobTitle || !body.email || !body.gender){
        return res.status(400).json({status: 'Error', message: 'Plz fill all details!'});
    }

    const result = await User.create({
        firstName: body.firstName, 
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        JobTitle: body.JobTitle,
        },
    );
    
    // console.log('Result', result);// debugging
    
    return res.status(201).json({ status: 'Success' });

}

module.exports = {
    handleGetUsers,
    handleGetUserById,
    handleUpdateUserByID,
    handleDeleteUserByID,
    handleCreateNewUser,
}