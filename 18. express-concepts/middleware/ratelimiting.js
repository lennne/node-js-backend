const rateLimit = require('express-rate-limit')

const createBasicRateLimiter = (maxRequests, time) => {
    return rateLimit({
        //maximum number of requests in the time window
        max: maxRequests,
        windowMs: time,
        message: 'Too many requests, please try again later',
        standardHeaders: true,
        legacyHeaders: false
    })
}

module.exports = { createBasicRateLimiter }