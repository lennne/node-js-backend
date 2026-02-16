const Post = require('../models/Post');
const logger = require('../utils/logger');
const { publishEvent } = require('../utils/rabbitmq');
const { invalidatePostCache } = require('../utils/redisCache');
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

        await publishEvent('post.created', {
            postId : newlyCreatedPost._id.toString(),
            userId : newlyCreatedPost.user.toString(),
            content : newlyCreatedPost.content,
            createdAt : newlyCreatedPost.createdAt
        });

        // invalidate(delete) the cached posts in the redis memory
        invalidatePostCache(req, newlyCreatedPost._id.toString());
        
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
          //cache using redis client, invalidate the cache whenever we create or delete a post
          const page = parseInt(req.query.page) || 1 ;
          const limit = parseInt(req.query.limit) || 10;
          const startIndex = ( page - 1) * limit;
          
          //create a cacheKey
          const cacheKey = `posts:${page}:${limit}`;
          const cachedPosts = await req.redisClient.get(cacheKey) // if there are any posts present in cache
          if(cachedPosts){
            return res.json(JSON.parse(cachedPosts))
          }

          const posts = await Post.find({}).sort({createdAt : -1}).skip(startIndex).limit(limit);
          const totalNumberOfPosts = await Post.countDocuments()

          const result = {
            posts, 
            currentpage : page,
            totalPages : Math.ceil(totalNumberOfPosts/limit),
            totalPosts : totalNumberOfPosts
          }

          // save your posts in redis cache
          // we pass in a time limit of 5 minutes(300s), meaning that after the data has been saved, 
          // it should be deleted after 5 minutes - in other words, the data should be kept for only 5 minutes
          await req.redisClient.setex(cacheKey, 300, JSON.stringify(result))

          res.json({
            success: true,
            message: "Posts fetched successfully",
            ...result
          })
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
          const postId = req.params.id;
          if(!postId){
            return res.status(400).json({
                success: false,
                message: "ID is required",
            })
          }

          const cacheKey = `post:${postId}`
          const cachedPost = await req.redisClient.get(cacheKey);
          const parsedCachedPost = JSON.parse(cachedPost)
          if(cachedPost){
            return res.json({
                success: true,
                message: "Post fetched successfully",
                parsedCachedPost
            })
          }

          const post = await Post.findById(postId);
          if(!post){
            return res.status(400).json({
                success: false,
                message: "Post does not exist"
            })
          }

          await req.redisClient.setex(cacheKey, 3600, JSON.stringify(post))
          return res.json({
            success: true,
            message: "Post fetched Successfully",
            post
          })

    } catch (error) {
        logger.error('Error fetching post by ID', error)

        return res.status(500).json({
            success: false,
            message: "Error fetching post by ID"
        })
    }
}

 const deletePost = async (req, res) => {
    try {
          const postId = req.params.id;
          if(!postId){
            return res.status(400).json({
                success: false,
                message: "ID is required",
            })
          }



          const post = await Post.findOneAndDelete({
            _id: postId,
            user: req.user.userId
          })

          if(!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false,
            })
          }

          //publiish post delete method
          await publishEvent('post.deleted', {
            postId : post._id.toString(),
            userId : req.user.userId,
            mediaIds : post.mediaIds 
          }); // the key is the action you're performing

          await invalidatePostCache(req, postId)
          
          return res.json({
            success: true,
            message: "Post deleted Successfully",
            post
          })

    } catch (error) {
        logger.error('Error Deleting post by ID', error)

        return res.status(500).json({
            success: false,
            message: "Error Deleting post by ID"
        })
    }
}

module.exports = { createPost, getAllPosts, getPost, deletePost }