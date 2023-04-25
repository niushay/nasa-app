const express = require("express")

const { httpGetAllPlanets } = require("./planets.controller");

const planetRouter = express.Router();
planetRouter.get('/planets', httpGetAllPlanets)

module.exports = planetRouter;