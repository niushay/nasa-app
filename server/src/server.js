const http = require("http")

const app = require('./app')
const {mongoConnect} = require('./services/mongo')
const { loadPlanetData } = require('./models/planets.model')

const PORT = process.env.PORT || 9000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    await loadPlanetData();

    server.listen(PORT, () => {
        console.log(`Server is listening to port ${PORT}...`);
    })
}
startServer();