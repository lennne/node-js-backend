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
            return res.status(400).json({
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

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username})

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        // create user token
        const accessToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '15m'
        });

        res.status(200).json({
            success: true,
            message: "Successfully logged in",
            accessToken,
            data: {
                username: user.username,
                role: user.role
            }
        })
    } catch (error) {
        console.log("Error logging into User -> ", error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again later"
        })
    }
}

const changePassword = async (req, res) => {
    try {
        const userId = req.userInfo.userId;
        
        //extract old and new password
        const {oldPassword, newPassword} = req.body;


        //find the current logged in user
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        //check if old password is correct
        const isPasswordMatch = bcrypt.compare(oldPassword, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }


        //hash the new password
        const salt = await bcrypt.genSalt(10);
        const newhashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = newhashedPassword
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Password Changed Successfully"
        })
        //get the authenticated user
        //check if user id is same as id retrieved from mongodb
        //update the data
    } catch (error) {
         console.log("Error logging into User -> ", error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again later"
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    changePassword
}