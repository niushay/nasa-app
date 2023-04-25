const launches = new Map();
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('27 December, 2030'),
    target: "Kepler-442 b",
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
}

launches.set(launch.flightNumber, launch);
console.log(launches);
module.exports = {
    launches
}