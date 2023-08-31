const userModel = require('../models/userModel');

//create user / register user
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //validation for invalid credentials
        if (!username || !email || !password) {
            return res.status(400).send({
                message: 'Fill all fields, please',
                success: false
            })
        }
        //validation for existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                message: 'User already exists',
                success: false
            })
        }
        //s ave user
        const user = new userModel({ username, email, password });
        await user.save();
        return res.status(201).send({
            message: 'User created',
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error registering user',
            success: false,
            error
        })
    }
}

//get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'error fetching users',
            success: false
        })
    }
}


//login 
exports.loginController = () => { }