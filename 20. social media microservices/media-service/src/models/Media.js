const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema({
    //after uploading to cloudinary you're provided a public id and you can use that for performing crud operations on the media
    publicId: {
        type: String,
        required: true
    },
    originalName : {
        type: String,
        required: true
    },
    //file type
    mimeType : {
        type : String,
        required : true
    },
    url : {
        type : String, 
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    }
}, { timestamp : true })

const Media = mongoose.model('Media', mediaSchema)

module.exports = Media