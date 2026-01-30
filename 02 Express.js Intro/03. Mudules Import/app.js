// Core Modules
const http = require('http');

// External Modules
const express = require('express');

// Local Modules
// const requestListener = require('./user');

const app = express();

app.use((req, res, next) => {
  console.log('Came in first middleware:', req.method, req.url);
  next();
});

app.use((req, res, next) => {
  console.log('Came in second middleware:', req.method, req.url);
  res.send('<h1>Hello from Express.js!</h1>');
});

const server = http.createServer(app);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});