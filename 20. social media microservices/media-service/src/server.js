require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet');
const mediaRoutes = require('./routes/media-routes')
const errorHandler = require('./middleware/errorHandler')
const logger = require('./utils/logger');
const { connectToDB } = require('./database/db');
const { connectRabbitMQ, consumeEvent } = require('./utils/rabbitmq');
const { handlePostDeleted } = require('./eventHandlers/media-event-handler');

const app = express();
const PORT = process.env.PORT || 3003

connectToDB(logger)

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`)
    logger.info(`Request body, ${req.body}`)
    next();
})

// protect sensitve endpoint

app.use('/api/media', mediaRoutes)

app.use(errorHandler)

async function startServer(){
    try {
        await connectRabbitMQ();

        //consume all the events
        await consumeEvent('post.deleted', handlePostDeleted)

        app.listen(PORT, () => {
            logger.info(`Media service running on ${PORT}`)
        });

    } catch (error) {
        logger.error(`Failed to connect to server`, error);
        process.exit(1)
    }
}

startServer();

process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at ${promise} reason: ${reason}`)
})