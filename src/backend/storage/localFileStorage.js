let fs = require('fs');
let path = require('path')
let util = require('util');

const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const FileLocation = 'userdata';

function getTripsFilePath(user) {
    let dataDir = path.join(__dirname, FileLocation);
    return path.join(dataDir, user + '-trips.json');
}

function getExpendituresFilePath(user, tripId) {
    let dataDir = path.join(__dirname, FileLocation);
    return path.join(dataDir, `${user}-${tripId}-expenditures.json`);
}

// Reads all the trips belonging to a particular user, 
// and returns them in an array
// would be more efficient to write them into a provided stream
// but I'm not sure if that will be compatible with the eventual DB backed storage
// so I am doing it the simple way.
// if the user has no trips file yet, returns an empty array
async function readTrips(user) {
    console.log(`reading trips for ${user}`);

    let filePath =  getTripsFilePath(user);
    
    let trips = await readTripsOrExpenditures(filePath);

    if (trips.succeeded) {
        console.log(`read ${trips.jsonData}`);
    }
    return trips;
}

async function readTripsOrExpenditures(filePath) {
    let data;
    try {
        data = await readFile(filePath, {encoding: 'UTF-8'});
    } catch (err) {
        if (err.code === "ENOENT") {
            // file does not exist -- make an empty array 
            console.log(`file does not exist yet for ${filePath}`);
            data = "[]";
        } else {
            console.log(`readTripsOrExpenditures error reading existing file ${err}`);
            return {succeeded: false};
        }
    }

    console.log('read file data: ' + data);
    let jsonData = JSON.parse(data);
    return { succeeded: true, jsonData: jsonData};   
}

// Appends the provided trip to the user's set of trips
async function writeTrip(user, trip) {
    console.log(`Saving trip ${trip.id} for ${user}`);

    // Make the directory, if it does not exist
    let dataDir = path.join(__dirname, FileLocation);

    if (!fs.existsSync(dataDir)) {
        console.log("Creating Data Directory at " + dataDir);
        try {
            await mkdir(dataDir);
        } catch (err) {
            console.log(`Creating data dir failed with ${err}`);
            return false;
        }
    }

    let readTripsResponse;
    try {
        readTripsResponse = await readTrips(user);
    } catch (err) {
        console.log(`error reading trips ${err}`);
        return false;
    }

    console.log(readTripsResponse);
    if (!readTripsResponse.succeeded) {
        return false;
    }

    existingTrips = readTripsResponse.trips;
    existingTrips.push(trip);
    
    try {
        await writeFile(getTripsFilePath(user), JSON.stringify(existingTrips));
    } catch (err) {
        console.log(`writeTrip error writing new trip ${err}`);
        return false;
    }

    console.log("Trip saved");
    return true;
} 

module.exports = {writeTrip, readTrips};