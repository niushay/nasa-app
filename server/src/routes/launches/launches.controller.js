const { getAllLaunches } = require('../../models/launches.model');

function httpGetAllLaunches(req, res){
    console.log(getAllLaunches());
    res.status(200).json(getAllLaunches());
}

module.exports = {
    httpGetAllLaunches
}