const { default: mongoose } = require('mongoose');
const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')

const axios = require('axios');

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
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    })
}

async function scheduleNewLaunch(launch){
    const planet = await planets.findOne({keplerName: launch.target})
    if(!planet){
        throw new Error('No matching planets found')
    }

    const latestFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Niusha', 'NASA'],
        flightNumber: latestFlightNumber
    })

    await saveLaunch(newLaunch);
}

async function findLaunch(filter){
    return await launchesDatabase.findOne(filter)
}

async function existsLaunchById(launchId){
    return await findLaunch({
        flightNumber: launchId 
    });
}

async function getLatestFlightNumber(){
    const latestLaunch = await launchesDatabase
    .findOne()
    .sort('-flightNumber');

    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

async function abortLaunchById(launchId){
   const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId
    },{
        upcoming: false,
        success: false
    })

    return aborted.modifiedCount === 1;
}

//Get data from Space-X
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunches(){
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
                }
            ]
        }
    });

    if(response.status !== 200) {
        throw new Error('Launch Data download failed')
    }

    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads  = launchDoc['payloads'];
        //each payload has its own customers, we have all customers from each payload
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        })

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers: customers
        }
        console.log(`${launch.flightNumber} ${launch.mission}`);

        await saveLaunch(launch);
    }
}

async function loadLaunchData(){
    console.log('Downloadin Data ...');
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSet'
    })

    if(firstLaunch){
        console.log('launch Data already exists');
    }else{
        await populateLaunches();
    }
 
}

module.exports = {
    loadLaunchData,
    getAllLaunches,
    existsLaunchById,
    abortLaunchById,
    scheduleNewLaunch
}