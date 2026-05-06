require('dotenv').config()

const express = require('express')
const cors = require('cors')
const Redis = require('ioredis')
const helmet = require('helmet')
const {rateLimit} = require('express-rate-limit')
const {RedisStore} = require('rate-limit-redis')
const proxy = require('express-http-proxy')

const logger = require('./utils/logger')
const errorHandler = require('./middleware/errorHandler')
const validateToken = require('./middleware/authMiddleware')

const app = express()
const PORT = process.env.PORT || 3000

const redisClient = new Redis(process.env.REDIS_URL);

//rate limiting
const ratelimitOptions = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 100,
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

app.use(helmet())
app.use(cors())
app.use(express.json())



app.use(ratelimitOptions)

app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url }`)
    logger.info(`Request body, ${req.body}`)
    next()
})

//Due to concept 1, we will need some kind of proxy to do the routing
const proxyOptions = {
    proxyReqPathResolver : (req) => {
        return req.originalUrl.replace(/^\/v1/, "/api") // replace the "/v1" with "/api" and return the updated URL
    },
    proxyErrorHandler : (err, res, next) => {
        logger.error(`Proxy error : ${err.message}`);
        res.status(500).json({
            success: false,
            message: `Internal server error`, error : err.message 
        })
    }
}

//setting up proxy for our identity service
app.use('/v1/auth', proxy(process.env.IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator : (proxyReqOpts, srcReq) => { //allows customization of the proxy request before it 
    // is sent to the targeted service an example is adding some content-type header or you want to modify some more headers
        proxyReqOpts.headers["content-type"] = "application/json"
        return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => { // This decorator is used to intercept and handle
    // the response coming back from a microservice before it reaches the final user.
    // proxyRes: This is the Response Object from the Proxy Service (e.g., the Identity or Post service).
    // It contains metadata about that response, such as the statusCode
    // proxyResData: This is the Actual Body Data returned by the microservice. It is used to
    // send the final response data back to the user
    // userReq: This is the Original Request Object that was initially sent by the user to the API Gateway.
    // userRes: This is the Response Object for the User. It is the "container" that will eventually carry
    // the response data from the Gateway back to the user's client (like Postman or a browser).
        logger.info(`Response received from Identity service: ${proxyRes.statusCode}`)
        return proxyResData;
    }
}, ));

//setting up proxy for our post service
app.use('/v1/post', validateToken, proxy(process.env.POST_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator : (proxyReqOpts, srcReq) => { 
        proxyReqOpts.headers["content-type"] = "application/json"
        proxyReqOpts.headers["x-user-id"] = srcReq.user.userId //new change, we get the userId from authmiddleware and then assign it to the headers
        return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => { 
        logger.info(`Response received from Post service: ${proxyRes.statusCode}`)
        return proxyResData;
    }
}, ));

//setting up proxy for our media service
app.use('/v1/media', validateToken, proxy(process.env.MEDIA_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator : (proxyReqOpts, srcReq) => { 
        proxyReqOpts.headers["x-user-id"] = srcReq.user.userId
        if(!srcReq.headers['content-type'].startsWith('multipart/form-data')){
            proxyReqOpts.headers["content-type"] = "application/json"
        }
        
        return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => { 
        logger.info(`Response received from Media service: ${proxyRes.statusCode}`)
        return proxyResData;
    },
    parseReqBody : false
}, ));


//setting up proxy for our media service
app.use('/v1/search', validateToken, proxy(process.env.SEARCH_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator : (proxyReqOpts, srcReq) => { 
        proxyReqOpts.headers["x-user-id"] = srcReq.user.userId
        return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => { 
        logger.info(`Response received from Search service: ${proxyRes.statusCode}`)
        return proxyResData;
    },
    parseReqBody : false
}, ));

app.use(errorHandler)

app.listen(PORT, () => {
    logger.info(`API Gateway is running on port ${PORT}`)
    logger.info(`Identity service is running on port ${process.env.IDENTITY_SERVICE_URL}`)
    logger.info(`Post service is running on port ${process.env.POST_SERVICE_URL}`)
    logger.info(`Media service is running on port ${process.env.MEDIA_SERVICE_URL}`)
    logger.info(`Search service is running on port ${process.env.SEARCH_SERVICE_URL}`)
    logger.info(`Redis Url ${process.env.REDIS_URL}`)
})