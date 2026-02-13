require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const Redis = require('ioredis');
const {RedisStore} = require('rate-limit-redis')
const cors = require('cors')
const helmet = require('helmet');
const postRoutes = require('./routes/post-routes')
const errorHandler = require('./middleware/errorHandler')
const { rateLimit } = require('express-rate-limit')
const logger = require('./utils/logger');


const app = express()
const PORT = process.env.PORT || 3002;

const {connectToDB} = require('./database/db');

connectToDB(logger)

const redisClient = new Redis(process.env.REDIS_URL);

//middleware
app.use(helmet());
app.use(cors())
app.use(express.json());

app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Request body, ${req.body}`);
    next(); 
})

//rate limiting on a specific endpoint
const sensitiveEndpointsLimiter = rateLimit({
    windowMs : 15 * 60 * 1000, 
    max : 50,
    standardHeaders : true,
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

//routes -> pass redisclient to routes
app.use('/api/post', (req, res, next) => {
    req.redisClient = redisClient
    next()
}, postRoutes)

app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Post service running on port: ${PORT}`)
})

process.on('unhandledRejection', () => {
    logger.error(`unhandled Rejection at ${promise}, reason: ${reason}`)
})