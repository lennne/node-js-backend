const cors = require('cors');

const configureCors = () => {
    return cors({
        //origin -> which origins are allowed to access this API
        origin: (origin, callback) =>  {
            const allowedOrigins = [
                'http://localhost:3000',
                'https://yourcustomdomain.com' //maybe your production domain
            ]

            if(!origin || allowedOrigins.indexOf(origin) !== -1){
                callback(null, true) //giving permission so that req can be allowed
            }else {
                callback(new Error('Not allowed by cors'))
            }
        },
        // which HTTP methods are you allowing 
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        // which HTTP headers are allowed
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept-Version'
        ],
        // which headers are exposed to the client in the response
        exposedHeaders: [ 'X-Total-Count', 'Content-Range'],
        // enables support for cookies and authorization headers
        credentials: true,
        // this option allows the browser to check with this server before making certain requests
        // say the browser wants to send a DELETE request, it'll first send a preflight request to ask the server
        // does this server accept requests such as these
        preflightContinue: false,
        maxAge: 600, //cache the preflight responses for 10 mins (600 seconds) to avoid sending options requests multiple times
        optionsSuccessStatus: 204 
    })
}

module.exports = configureCors