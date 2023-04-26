const { getAllLaunches, addNewLaunch, existsLaunchById, abortLaunchById } = require('../../models/launches.model');

function httpGetAllLaunches(req, res){
    res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if(!launch.mission || !launch.target || !launch.launchDate || !launch.rocket){
        return res.status(400).json({
            error: "Missing required launch property"
        })
    }

    launch.launchDate = new Date(launch.launchDate)
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: "Invalid launch date"
        })
    }

    addNewLaunch(launch);
    
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res){
    const launchId = +req.params.id;

    //If not exists
    if(!existsLaunchById(launchId)){
        return res.status(400).json({
            error: "Launch not found!"
        })
    }

    //If exists
    const aborted = abortLaunchById(launchId)
    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}