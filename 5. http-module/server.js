//when you want to creaate an http-server, you use this module
const http = require('http')
const server = http.createServer((req, res) => {
    // the request object contains all the information about the request
    console.log(req, "req")
})

const port = 3000;
server.listen(port, () => {
    console.log(`Server is now listening on port ${port}`))
