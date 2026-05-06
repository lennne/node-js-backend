const express = require('express')


const {authenticateRequest} = require('../middleware/authMiddleware') 
const { uploadMedia, getAllMedia } = require('../controllers/media-controller')
const logger = require('../utils/logger')
const { upload } = require('../utils/multer')
const multer = require('multer')

const router = express.Router()

router.post('/upload', authenticateRequest, (req, res, next) => { //middleware for multer upload in server
    upload(req, res, function(err){
        if(err instanceof multer.MulterError){
            logger.error(`Multer error while uploading: ${err}`)
            return res.status(400).json({
                message : `Multer error while uploading: ${err}`,
                error : err.message,
                stack : err.stack
            })
        } else if (err){
            logger.error(`Unknown error occured while uploading ${err}`)
            return res.status(500).json({
                message : `Unkown error occured while uploading: ${err}`,
                error : err.message,
                stack : err.stack
            })
        }

        if(!req.file){
            return res.status(500).json({
                message : `No file found`,
            })
        }

        next()

    }) 
}, uploadMedia)

router.get('/', authenticateRequest, getAllMedia);

module.exports = router