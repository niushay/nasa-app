const path = require("path")
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const api = require('./routes/api');

const app = express();

const whiteList = ['http://localhost:3000', 'http://localhost:9500'];
const corsOptionsDelegate = function (req, callback) {
    const origin = req.header('Origin');
    let corsOptions;
    if (whiteList.indexOf(origin) !== -1 || origin === undefined ) {
      corsOptions = { origin: true }
    } else {
      corsOptions = { origin: false }
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }
app.use(cors(corsOptionsDelegate));

//Logging middleware
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/v1', api);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

module.exports = app;