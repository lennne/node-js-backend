const express = require('express');
const { authenticateRequest } = require('../middleware/authMiddleware');
const { searchPostController } = require('../controllers/search-controller');
const router = express.Router();


router.use(authenticateRequest);

router.get('/post', searchPostController)

module.exports = router