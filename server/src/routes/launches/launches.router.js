const express = require('express');
const launchRouter = express.Router();
const { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch} = require('./launches.controller');

launchRouter.get('/', httpGetAllLaunches);
launchRouter.post('/', httpAddNewLaunch);
launchRouter.delete('/:id', httpAbortLaunch);

module.exports = launchRouter;

