const express = require('express');
const launchRouter = express.Router();
const { getAllLaunches } = require('./launches.controller');

launchRouter.get('/launches', getAllLaunches);

module.exports = launchRouter;

