// Core Modules
const path = require('path');

// External Modules
const express = require('express');
const bodyParser = require('body-parser');

// Local Modules
const homeRouter = require("./router/userRouter");
const serviceRouter = require("./router/serviceRouter");

// Express App Initialization
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded());

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.static(path.join(__dirname, './public'))); // Serving Static Files

app.use(homeRouter);
app.use(serviceRouter);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

const PORT = 5000;
// Starts the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});