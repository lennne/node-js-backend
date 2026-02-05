require('dotenv').config()
const express = require('express')
const cors = require('cors');
const configureCors = require('./config/corsConfig');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(configureCors())
// express json middleware
app.use(express.json())


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})