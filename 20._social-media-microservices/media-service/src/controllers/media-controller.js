const Media = require('../models/Media')
const { uploadMediaToCLoudinary } = require('../utils/cloudinary')
const logger = require('../utils/logger')



const uploadMedia = async (req, res) => {
    logger.info(`Starting media upload`)
    try{
        console.log(req.file, "req.file ")
        if(!req.file){
            logger.error(`No file found. Add file and try again!`)
            return res.status(400).json({
                success: false, 
                message: 'No file found. Add file and try again!'
            })
        }

        const {originalname, mimetype, buffer} = req.file
        const userId = req.user.userId

        logger.info(`File details: name=${originalname}, type=${mimetype}`)
        logger.info('Uploading to cloudinary starting...')

        const cloudinaryUploadResults = await uploadMediaToCLoudinary(req.file )
        logger.info(`Cloudinary upload successfully. Public Id: ${cloudinaryUploadResults.public_id}`)

        const newlyCreatedMedia = new Media({
            publicId: cloudinaryUploadResults.public_id,
            originalName: originalname,
            mimeType : mimetype,
            url : cloudinaryUploadResults.secure_url,
            userId
        });

        await newlyCreatedMedia.save()

        res.status(201).json({
            success : true,
            message : "Uploaded to cloudinary",
            mediaId : newlyCreatedMedia._id,
            url : newlyCreatedMedia.url,
        })
    }catch(error){
        logger.error('Error creating media', error);

        return res.status(500).json({
            success: false,
            message: 'Error creating media '
        })
    }
}

const getAllMedia = async (req, res) => {
    logger.info(`Starting media upload`)
    try {
        const result = await Media.find({})
        res.json({
            success: true,
            message: "Successfully fetched data",
            result
        });
    } catch (error) {
         logger.error('Error fetching media', error);

        return res.status(500).json({
            success: false,
            message: 'Error fetching media '
        })
    }
}

module.exports = { uploadMedia, getAllMedia }