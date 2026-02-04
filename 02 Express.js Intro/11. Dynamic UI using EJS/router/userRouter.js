// Core Modules
const path = require('path');

// External Modules 
const express = require('express');

// Local Modules
const {registeredHomes} = require('./serviceRouter');

const homeRouter = express.Router();
// Router for homepage / landing page
homeRouter.get('/', (req, res, next) => { 
  res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
  console.log('I am from userRouter: ', registeredHomes.houseName);
});

module.exports = homeRouter;