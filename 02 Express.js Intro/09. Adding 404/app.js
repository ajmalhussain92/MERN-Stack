// Core Modules
const http = require('http');

// External Modules
const express = require('express');
const bodyParser = require('body-parser');

// Local Module
const userRouter = require("./router/userRouter");
const hostRouter = require("./router/hostRouter");

const app = express();

// Starts the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Middleware to log request details
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

// Sequence matters
app.use(express.urlencoded());
app.use(hostRouter);
app.use(userRouter);

// Adding 404 Handler
app.use((req, res, next) => {     // 404 Handler
  res.status(404).send(`
    <h1>404 Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a href="/">Go to Home</a>
  `);
});