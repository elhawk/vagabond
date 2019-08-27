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

    return trips;
}

async function readExpenditures(user, tripId) {
    console.log(`reading expenditures for ${user}, trip ${tripId}`);

    let filePath = getExpendituresFilePath(user, tripId);

    let expenditures = await readTripsOrExpenditures(filePath);

    return expenditures;
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

    let jsonData = JSON.parse(data);
    return { succeeded: true, jsonData: jsonData};   
}

// appends the provided expenditure to the user's set of expenditures for that trip
async function writeExpenditure(user, trip, expenditure) {
    console.log(`Saving expenditure ${expenditure.id} for ${user} in trip ${trip}`);

    let succeeded = await appendItemToFile(getExpendituresFilePath(user, trip), expenditure);

    console.log(`Saving expenditure succeeded: ${succeeded}`);

    return succeeded;
}

// Appends the provided trip to the user's set of trips
async function writeTrip(user, trip) {
    console.log(`Saving trip ${trip.id} for ${user}`);

    let succeeded = await appendItemToFile(getTripsFilePath(user), trip);

    console.log(`Saving trip succeeded: ${succeeded}`);

    return succeeded;
}

async function appendItemToFile(filePath, itemToAppend) {
    console.log(`Appending item to file ${filePath}`);

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

    let readExistingItemsResponse;
    try {
        readExistingItemsResponse = await readTripsOrExpenditures(filePath);
    } catch (err) {
        console.log(`error reading existing items ${err}`);
        return false;
    }

    if (!readExistingItemsResponse.succeeded) {
        return false;
    }

    let existingItems = readExistingItemsResponse.jsonData;
    existingItems.push(itemToAppend);
    
    try {
        await writeFile(filePath, JSON.stringify(existingItems));
    } catch (err) {
        console.log(`appendItemToFile error writing new file ${err}`);
        return false;
    }

    return true;
}

module.exports = {writeTrip, readTrips, readExpenditures, writeExpenditure};