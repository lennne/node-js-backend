const express = require('express')
const { createPost } = require('../controllers/post-controller')
const { authenticateRequest } = require('../middleware/authMiddleware')
const router = express.Router()

// middleware -> this will determine if the user is authenticated or not
router.use(authenticateRequest);

router.post('/create-post', createPost);

module.exports = router;