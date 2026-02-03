// Core Modules
const path = require('path');

// External Modules 
const express = require('express');

const homeRouter = express.Router();
// Router for homepage / landing page
homeRouter.get('/', (req, res, next) => { 
  res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
});

module.exports = homeRouter;