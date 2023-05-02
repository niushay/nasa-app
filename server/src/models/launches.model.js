const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')
// const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('27 December, 2030'),
    target: "Kepler-442 b",
    customer: ['Niusha', 'NASA'],
    upcoming: true,
    success: true
}

saveLaunch(launch);

async function getAllLaunches() {
    return await launchesDatabase.find({}, {
        '_id': 0, '__v':0
    });
}

async function saveLaunch(launch){
    const planet = await planets.findOne({keplerName: launch.target})
    if(!planet){
        throw new Error('No matching planets found')
    }

    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    })
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        success:true,
        upcoming: true,
        customers: ['Niusha', 'NASA'],
        flightNumber: latestFlightNumber
        })
    );
}

function existsLaunchById(launchId){
    return launches.has(launchId);
}

async function getLatestFlightNumber(){
    const latestLaunch = await launchesDatabase
    .findOne()
    .sort('-flightNumber');

    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestFlightNumber.flightNumber;
}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;

    return aborted;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchById,
    abortLaunchById
}