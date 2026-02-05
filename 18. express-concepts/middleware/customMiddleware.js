const requestLogger = (req, res, next) => {
    const timeStamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const userAgent = req.get('User-Agent')
    console.log(`[${timeStamp}]  ${method} ${url} - ${userAgent}`);
    
    //call this function to go to the next middleware function
    next()
}

const addTimeStamp = (req, res, next) => {
    //adding a new property to the request object
    req.timeStamp = new Date().toISOString()
    next()
}

module.exports = { requestLogger, addTimeStamp }