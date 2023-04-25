const express = require('express');
const launchRouter = express.Router();
const { httpGetAllLaunches, httpAddNewLaunch } = require('./launches.controller');

launchRouter.get('/', httpGetAllLaunches);
launchRouter.post('/', httpAddNewLaunch);

module.exports = launchRouter;

