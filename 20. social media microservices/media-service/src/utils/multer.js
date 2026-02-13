const multer = require('multer')

//configure multer for file upload
const upload = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 5 * 1024 * 1024 // 5mb
    }
}).single('file')

module.exports = { upload }