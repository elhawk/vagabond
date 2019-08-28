var express = require('express');
var router = express.Router();
var storage = require('../storage/localFileStorage');

/* GET trips listing. */
router.get('/', async (req, res, next) => {
  let tripsResponse;

  try {
    tripsResponse = await storage.readTrips(req.query.user);
  } catch (err) {
    console.log(`Error reading trips ${err}`);
    tripsResponse = {succeeded: false};
  }

  if (tripsResponse.succeeded) {
    res.json(tripsResponse.jsonData);
  } else {
    res.status(500);
    res.end();
  }
});

router.post('/', async (req, res, next) => {
    let userId = req.body.user;

    let trip = {
        id: req.body.id,
        name: req.body.name,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        budget: req.body.budget
    }

    let writeSucceeded = false;
    try {
      writeSucceeded = await storage.writeTrip(userId, trip);
    } catch (err) {
      console.log(`error writing file ${err}`);
    } 

    res.status(writeSucceeded ? 200 : 500);
    res.end();
});

router.delete('/', async(req, res, next) => {
  let userId = req.query.user;
  let tripId = req.query.id;

  let deleteSucceeded = false;
  try {
    deleteSucceeded = await storage.deleteTrip(userId, tripId);
  } catch (err) {
    console.log(`error deleting trip ${err}`);
  }

  res.status(deleteSucceeded ? 200 : 500);
  res.end();
});

module.exports = router;
