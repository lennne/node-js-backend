const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const verifyRole = require('../middleware/verify-roles');
const { uploadImageController, getImagesController } = require('../controllers/image-controller');
const uploadMiddleware = require('../middleware/upload-middleware');
const router = express.Router();

//upload Image
router.post('/upload', authMiddleware, verifyRole, uploadMiddleware.single('image'), uploadImageController);
router.get('/', authMiddleware, getImagesController)
//get all the images

module.exports = router