const mongoose = require('mongoose');

const MONGO_URL = "mongodb+srv://nasa-api:p7yNEzcyWNytzVBS@nasacluster.5h5b7jm.mongodb.net/nasa?retryWrites=true&w=majority";

mongoose.connection.once('open', () => {
    console.log('Mongoose successfully connected!');
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URL)
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}