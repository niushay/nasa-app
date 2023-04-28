const http = require("http")
const mongoose = require('mongoose');

const app = require('./app')

const { loadPlanetData } = require('./models/planets.model')

const PORT = process.env.PORT || 9000;
const MONGO_URL = "mongodb+srv://nasa-api:p7yNEzcyWNytzVBS@nasacluster.5h5b7jm.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('Mongoose successfully connected!');
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})

async function startServer() {
    await mongoose.connect(MONGO_URL)

    await loadPlanetData();

    server.listen(PORT, () => {
        console.log(`Server is listening to port ${PORT}...`);
    })
}
startServer();