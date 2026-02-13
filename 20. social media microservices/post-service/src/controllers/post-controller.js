const Post = require('../models/Post');
const logger = require('../utils/logger');
const { validateCreatePost } = require('../utils/validation');

const createPost = async (req, res) => {
    logger.info(`Create Post endpoint hit...`)
    try {
        const {error} = validateCreatePost(req.body)
        if (error){
            logger.warn(`Validation error: ${error.details[0].message}`);
            return res.status(400).json({
                success : false,
                message : error.details[0].message
            })
        }   

        const { content, mediaIds } = req.body;
        const newlyCreatedPost = new Post({
            user : req.user.userId,
            content,
            mediaIds : mediaIds || []
        });

        await newlyCreatedPost.save();
        logger.info(`Post created successfully ${newlyCreatedPost}`)
        res.status(201).json({
            success: true,
            message: "Post created successfully"
        })

    } catch (error) {
        logger.error('Error creating post', error)

        return res.status(500).json({
            success: false,
            message: "Error creating post"
        })
    }
}

const getAllPosts = async (req, res) => {
    try {
          
    } catch (error) {
        logger.error('Error fetching posts', error)

        return res.status(500).json({
            success: false,
            message: "Error fetching posts"
        })
    }
}

 const getPost = async (req, res) => {
    try {
          
    } catch (error) {
        logger.error('Error fetching post by ID', error)

        return res.status(500).json({
            success: false,
            message: "Error fetching post by ID"
        })
    }
}

module.exports = { createPost }