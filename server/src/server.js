const http = require("http");

require('dotenv').config();

const app = require('./app')
const {mongoConnect} = require('./services/mongo')
const { loadPlanetData } = require('./models/planets.model')
const { loadLaunchData } = require('./models/launches.model')

const PORT = process.env.PORT || 9000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    await loadPlanetData();
    await loadLaunchData();

    server.listen(PORT, () => {
        console.log(`Server is listening to port ${PORT}...`);
    })
}
startServer();