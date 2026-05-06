require('dotenv').config()
const express = require('express');
const app = express()
const helmet = require('helmet')
const { RateLimiterRedis } = require('rate-limiter-flexible') 
const Redis = require('ioredis')
const cors = require('cors')
const {rateLimit} = require('express-rate-limit')
const {RedisStore} = require('rate-limit-redis')

const logger = require('./utils/logger')
const {connectToDB} = require('./db/db');
const routes = require('./routes/identity-service');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3001;

connectToDB()


const redisClient = new Redis(process.env.REDIS_URL)

//MIDDLEWARE

//Helmet package for security
app.use(helmet()) //helmet helps secure the express app thereby improvin security

//Cors package for cross origin policy
app.use(cors())

//json package for parsing data to json format
app.use(express.json())

app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url }`)
    logger.info(`Request body, ${req.body}`)
    next()
})

//DDos protection and rate limiting
const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient, //this stores the redis store client
    //NB: your redis has to be in a connected and available state
    keyPrefix : 'middleware', //it's a prefix key that is added to your redix keys for rate limiting,
    //  this helps distinguish rate limiting data from other redis data
    points : 10, // this refers to the maximum number of requests an IP address can make in a certain duration
    duration : 1 // this ratelimiter means you can make 10 requests in 1 second
})

app.use((req,res, next) => {
    rateLimiter.consume(req.ip).then(() => next()).catch(() => {
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`)
        res.status(429).json({
            success: false,
            message: "Too many requests"
        })
    })
})

//Ip based rate limiting for sensitive endpoints 
const sensitiveEndpointsLimiter = rateLimit({
    windowMs : 15 * 60 * 1000, //time window for the rate limiting
    max : 50,
    standardHeaders : true, // whether you want to include the rate limiting info in the response headers or not,
    //  this also allows the client to see how many requests they have in their current time window
    legacyHeaders : false,
    handler : (req, res) => { 
        logger.warn(`Sensitive endpoint rate limit exceeded for IP: ${req.ip} `)
        res.status(429).json({
            success: false,
            message: `Too many requests to ${req.url}`
        })
    },
    store: new RedisStore({
        sendCommand: (...args) => redisClient.call(...args),
    })

})

// apply this sensitiveEndpointsLimiter to our routes
app.use('/api/auth/register', sensitiveEndpointsLimiter)

//Routes
app.use('/api/auth', routes)

//error handler
app.use(errorHandler)

app.listen(PORT, ()=> {
    logger.info(`Identity service running on port ${PORT}`)
})

//unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {
    logger.error(`Unhandled Rejection at promise: ${promise}, reason: ${reason.message || reason}`, { 
        stack: reason.stack 
    });
})