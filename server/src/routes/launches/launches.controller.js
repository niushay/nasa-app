const { getAllLaunches, existsLaunchById, abortLaunchById, scheduleNewLaunch } = require('../../models/launches.model');

async function httpGetAllLaunches(req, res){
    res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
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

    await scheduleNewLaunch(launch);
    
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res){
    const launchId = +req.params.id;
    const existsLaunch = await existsLaunchById(launchId);

    //If not exists
    if(!existsLaunch){
        return res.status(400).json({
            error: "Launch not found!"
        })
    }

    //If exists
    const aborted = await abortLaunchById(launchId);
    if(!aborted){
        return res.status(400).json({
            error: "Launch not aborted"
        });
    }
    return res.status(200).json({
        ok: true
    })
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}