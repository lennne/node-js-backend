const winston = require('winston')

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine( //determines how we're going to format the messages
        winston.format.timestamp(), //add a timestamp everytime we log our files
        winston.format.errors({stack : true}), // when this is set to true it'll include the stack trace in our log file
        winston.format.splat(), //enables support for message templating 
        winston.format.json() //formating all our log messages in json for structural logging
        // the above are the four things that are happening and we're combining them into one format
    ),
    defaultMeta : { service: 'media-service'}, // this is just the metadata for this particular logger being used
    transports: [ // this specifies the transport(output destination) for our logs
        new winston.transports.Console({ //for instance we specify here that we want the logs in our console
            format : winston.format.combine( // and this is the formaat for the logs appearing in the console
                winston.format.colorize(), // for better visibility we use colorize
                winston.format.simple() // and this is simple logs
            ),
        }),
        new winston.transports.File({filename: 'error.log', level : 'error'}), // this specifies that we get it in this file
        new winston.transports.File({filename: 'combined.log'})
    ],
});

module.exports = logger; 
 