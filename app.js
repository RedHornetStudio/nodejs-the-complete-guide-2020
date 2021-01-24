const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('First middleware function');
  next();
});

app.use((req, res, next) => {
  console.log('Second middleware function');
  res.send('<h1>Hello from Express!</h1>')
});

const server = http.createServer(app);

server.listen(3000);