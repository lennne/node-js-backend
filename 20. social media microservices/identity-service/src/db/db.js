require('dotenv').config()

const mongoose = require('mongoose')

async function connectToDB(){
    mongoose.connect(process.env.MONGO_URI).
    then(() => logger.info('connected to mongodb')).
    catch((e) => logger.error('Mongo connection error', e))
}

module.exports = connectToDB 