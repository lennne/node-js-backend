const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try{
        //form data
        const {username, email, password, role} = req.body;

        //check if user already exists
        const existingUser = await User.findOne({$or : [{ username }, { email }]})
        if(existingUser){
            res.status(400).json({
                success: false,
                message: 'Username or Email already in use. Please try with different credentials.'
            })
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        //create new user
        const newUser = await User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user' //if role is not provided, default to 'user'
        })

        newUser.save();

        if(newUser){
            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role,
            }
        })
            
        }
    }catch(error){ 
        console.log("Error registering user -> ", error);
        return res.status(500).json({
            success: false,
            message: 'Server Error. Please try again later.'
        })
    }
}

const loginUser = (req, res) => {
    try {
        const { username, password } = req.body;
    } catch (error) {
        
    }
}

const changePassword = (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    registerUser,
    loginUser,
    changePassword
}