const express = require('express');
const app = express();
const { registerUser, loginUser, changePassword } = require('../controllers/auth-controller');

//create express router
const router = express.Router();

//all the routes that are related to authentication
router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/password', changePassword)

module.exports = router;