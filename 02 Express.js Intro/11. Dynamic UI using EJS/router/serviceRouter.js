// Core Modules
const path = require('path');

// External Modules
const express = require('express');

const serviceRouter = express.Router();

serviceRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'add-home.html'));
});

serviceRouter.post("/add-home", (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'home-added-success.html'));
  console.log(req.body);
});

module.exports = serviceRouter;