const express = require('express');
const { getAllUsers, registerController, loginController } = require('../controllers/userController');

const router = express.Router();

//GET - get all users
router.get('/allUsers', getAllUsers);

//POST - create user
router.post('/signup', registerController);

//POST - login
router.post('/login', loginController);

module.exports = router;