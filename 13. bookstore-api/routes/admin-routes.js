const express = require('express')
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');
const verifyRole = require('../middleware/verify-roles');

//check if user is authenticated using authmiddleware
router.get('/', authMiddleware, verifyRole, (req, res) => {
    res.status(200).json({
        message: "Welcome to admin routes"
    })
})

module.exports = router