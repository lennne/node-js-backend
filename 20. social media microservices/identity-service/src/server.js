require('dotenv').config()
const express = require('express');
const app = express()
const helmet = require('helmet')
const { RateLimiterRedis } = require('rate-limiter-flexible') 
const Redis = require('ioredis')
const cors = require('cors')

const logger = require('./utils/logger')
const connectToDB = require('./db/db');

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
        logger.warn(`Raate limit exceeded for IP: ${req.ip}`)
        res.status(429).json({
            success: false,
            message: "Too many requests"
        })
    })
})

 

app.listen(PORT, ()=> {

})