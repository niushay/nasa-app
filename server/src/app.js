const path = require("path")
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const planetRouter = require("./routes/planets/planets.router");

const app = express();

app.use(cors({
    'origin': "http://localhost:3000"
}))
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

app.use(planetRouter);

module.exports = app;