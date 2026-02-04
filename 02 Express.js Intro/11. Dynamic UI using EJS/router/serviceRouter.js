// Core Modules
const path = require('path');

// External Modules
const express = require('express');
const rootDir = require('../utils/pathUtil');

const serviceRouter = express.Router();

serviceRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-home.html'));
});

// An array to store home listings (in-memory)
const registeredHomes = [];

serviceRouter.post("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'home-added-success.html'));
  registeredHomes.push({houseName: req.body.houseName});
  registeredHomes.push({locationName: req.body.locationName});
  console.log(req.body);
  console.log(registeredHomes);
});

exports.serviceRouter = serviceRouter;
exports.registeredHomes = registeredHomes;

// module.exports = {registeredHomes, serviceRouter}; // Alternative way to export multiple things