const http = require('http');

const { requestHandler, someText } = require('./routes');

console.log(someText);

const server = http.createServer(requestHandler);

server.listen(3000);