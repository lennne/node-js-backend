require('dotenv').config();

const express = require('express')
const Redis = require('ioredis');
const {RedisStore} = require('rate-limit-redis')
const cors = require('cors')
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit')

const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler')
const { consumeEvent, connectRabbitMQ } = require('./utils/rabbitmq');
const { connectToDB } = require('./database/db');
const searchRoutes = require('./routes/search-routes');
const { handlePostCreated } = require('./eventHandlers/search-event-handlers');

const app = express()
const PORT = process.env.PORT || 3004
const redisClient = new Redis(process.env.REDIS_URL);

connectToDB(logger)


//middleware
app.use(helmet());
app.use(cors())
app.use(express.json());

app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Request body, ${req.body}`);
    next(); 
})

//*** Work on Ip based rate limiting for sensitve endpoints */

app.use('/api/search', searchRoutes)

app.use(errorHandler)

async function startServer(){
    try {
        await connectRabbitMQ();

        //consume the events (in other words subscribe to the events)
        await consumeEvent('post.created', handlePostCreated )
        logger.info(`Search server running on Port: ${PORT}`)
    } catch (error) {
        logger.error(error, 'Failed to start search service')
        process.exit(1)
    }
}

startServer();

process.addListener('on', () => {
    logger.error(`unhandled Rejection at ${promise}, reason: ${reason}`)
});