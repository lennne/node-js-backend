//objects that allow you to read data from a source
// or help you write data to a destination

//types of streams
// readable -> use for reaad
// writable -> write to a file
// duplex -> used for both read and write(example is a TCP socket)
// transform -> computed result of your input, like a map, an example is zlib streams


//say we want to encrypt a stream(perform some computations on it so that the output stream is something else)


// a module to read the files
const fs = require('fs')
const zlib = require('zlib')    //an inbuilt module similar which provides compression capabilities

const crypto = require('crypto')
const {Transform} = require('stream')

class EncryptStream extends Transform{
    constructor(key, vector){
        super()
        this.key = key
        this.vector = vector
    }

    _transform(chunk, encoding, callback){
        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.vector)
        const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()]) // encrypt the chunk passed

        this.push(encrypted)
        callback();
    }
}


const key = crypto.randomBytes(32)
const vector = crypto.randomBytes(16)

const readableStream = fs.createReadStream('input.txt')

//new gzip object to compress the stream of data
const gzipStream = zlib.createGzip()

const encryptStream = new EncryptStream(key, vector)

const writableStream = fs.createWriteStream('output.txt.gz.enc')

// read -> compress -> encrypt -> write the data

//read
readableStream.pipe(gzipStream).pipe(encryptStream).pipe(writableStream) 
console.log('Streaming -> compressing -> writing data')
