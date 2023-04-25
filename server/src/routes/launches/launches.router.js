const express = require('express');
const launchRouter = express.Router();
const { httpGetAllLaunches } = require('./launches.controller');

launchRouter.get('/launches', httpGetAllLaunches);

module.exports = launchRouter;

