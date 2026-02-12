require('dotenv').config()

const mongoose = require('mongoose')
const logger = require('../utils/logger')

async function connectToDB(){
    console.log(process.env.MONGO_URI)
    mongoose.connect(process.env.MONGO_URI).
    then(() => logger.info('connected to mongodb')).
    catch((e) => logger.error('Mongo connection error', e))
}

module.exports = {connectToDB}