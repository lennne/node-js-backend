const mongoose = require('mongoose');
async function connectToDB(){
    return await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("mongodb connected successfully"))
    .catch((e) => console.log(e));
}

module.exports = {
    connectToDB
}