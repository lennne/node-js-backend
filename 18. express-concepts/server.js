require('dotenv').config()
const express = require('express')
const configureCors = require('./config/corsConfig');
const { requestLogger, addTimeStamp } = require('./middleware/customMiddleware');
const { globalErrorHandler } = require('./middleware/errorHandler');
const { urlVersioning } = require('./middleware/apiversioning');
const { createBasicRateLimiter } = require('./middleware/ratelimiting');
const itemRoutes = require('./routes/item-routes')

const app = express();
const PORT = process.env.PORT || 3000;

//express logger middleware
app.use(requestLogger)
app.use(addTimeStamp)

//express cors configuration
app.use(configureCors())

//express rate limiting 
app.use(createBasicRateLimiter(2, 15*60*1000)) // 100 requests for 15 minutes

// express json middleware
app.use(express.json())

app.use(urlVersioning('v1'))
app.use('/api/v1', itemRoutes)

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})