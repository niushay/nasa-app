const launches = new Map();

latestFlightNumber = 100;
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

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
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

module.exports = {
    getAllLaunches,
    addNewLaunch
}