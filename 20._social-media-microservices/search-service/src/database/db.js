require('dotenv').config()
const mongoose = require('mongoose')

async function connectToDB(logger){
    mongoose
    .connect(process.env.MONGO_URI)
    .then(()=> logger.info(`Connected to mongodb`))
    .catch((error) => logger.error(`Mongo connection error ${error}`))
}

module.exports = { connectToDB }