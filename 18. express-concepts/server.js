require('dotenv').config()
const express = require('express')
const configureCors = require('./config/corsConfig');
const { requestLogger, addTimeStamp } = require('./middleware/customMiddleware');
const { globalErrorHandler } = require('./middleware/errorHandler');
const { urlVersioning } = require('./middleware/apiversioning');

const app = express();
const PORT = process.env.PORT || 3000;

//express logger middleware
app.use(requestLogger)
app.use(addTimeStamp)

app.use(configureCors())
// express json middleware
app.use(express.json())

app.use(urlVersioning)

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})