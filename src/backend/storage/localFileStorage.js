let fs = require('fs');
let path = require('path')
let util = require('util');

const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);

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

async function deleteTrip(userId, tripId) {
    // first, remove the entry for the trip from the trips file
    let tripsFilePath = getTripsFilePath(userId);

    let removeTripSucceeded = false;
    try {
        removeTripSucceeded = await deleteItem(tripsFilePath, tripId);
    } catch (err) {
        console.log(`removing trip failed with error ${err}`);
    }

    if (!removeTripSucceeded)
        return false;

    // then, delete the expenditures file for the trip
    let expendituresFilePath = getExpendituresFilePath(userId, tripId);

    let removeFileSucceeded = false;
    try {
        await unlink(expendituresFilePath);
        removeFileSucceeded = true;
    } catch (err) {
        if (err.code == "ENOENT") {
            // no expenditures were ever created for this trip
            removeFileSucceeded = true;
        } else {
            console.log(`removing expenditures file failed with error ${err}`);
        }
    }

    // if removing the expenditures file fails, log about it but return success
    // to the user since the trip will appear to be cleaned up on their side
    if (!removeFileSucceeded) {
        console.log('removing expenditure file failed');
    }

    return true;
}

async function deleteExpenditure(user, tripId, id) {
    let filePath = getExpendituresFilePath(user, tripId);

    let succeeded = false;
    try {
        succeeded = await deleteItem(filePath, id);
    } catch (err) {
        console.log(`error in deleteItem ${err}`);
    }

    return succeeded;
}

async function deleteItem(filePath, id) {

    function deleteItemById(items) {
        let itemIndex = items.findIndex((element) => element.id == id);

        if (itemIndex == -1) {
            console.log(`unable to find item ${id} to delete -- but it's already gone so return success`);
            return {succeeded: true, items: items};
        }

        items.splice(itemIndex, 1);
        return {succeeded: true, items: items};
    }

    let succeeded = false;
    try {
        succeeded = await modifyFile(filePath, deleteItemById);
    } catch (err) {
        console.log(`unexpected error deleting item ${err}`);
    }

    return succeeded;
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

    function modifier(items) {
        items.push(itemToAppend);
        return {items: items, succeeded: true};
    };

    let succeeded = false;
    try {
        succeeded = await modifyFile(filePath, modifier);
    } catch (err) {
        console.log(`appendItemToFile error  in modifyFile ${err}`);
        return false;
    }

    return succeeded;
}

// Reads a file (creating it if it does not exist), passes it to the provided function for modification,
// and writes it back afterwards
async function modifyFile(filePath, modifier) {
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

    let modifyResult = modifier(readExistingItemsResponse.jsonData);
    if (!modifyResult.succeeded) {
        return false;
    }
    
    try {
        await writeFile(filePath, JSON.stringify(modifyResult.items));
    } catch (err) {
        console.log(`modifyFile error writing new file ${err}`);
        return false;
    }

    return true;
}

module.exports = {writeTrip, readTrips, readExpenditures, writeExpenditure, deleteExpenditure, deleteTrip};