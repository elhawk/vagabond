var express = require('express');
var router = express.Router();
var storage = require('../storage/localFileStorage');

/* GET expenditures listing. */
router.get('/', async (req, res, next) => {
  let expendituresResponse;

  try {
    expendituresResponse = await storage.readExpenditures(req.query.user, req.query.tripId);
  } catch (err) {
    console.log(`Error reading expenditures ${err}`);
    expendituresResponse = {succeeded: false};
  }

  if (expendituresResponse.succeeded) {
    res.json(expendituresResponse.jsonData);
  } else {
    res.status(500);
    res.end();
  }
});

router.post('/', async (req, res, next) => {
    let userId = req.body.user;
    let tripId = req.body.tripId;

    let expenditure = {
        id: req.body.id,
        dates: [req.body.date],
        amount: req.body.amount,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location
    }

    let writeSucceeded = false;
    try {
      writeSucceeded = await storage.writeExpenditure(userId, tripId, expenditure);
    } catch (err) {
      console.log(`error writing file ${err}`);
    } 

    res.status(writeSucceeded ? 200 : 500);
    res.end();
});

router.delete('/', async(req, res, next) => {
  // todo implement
  res.status(200);
  res.end();
});

module.exports = router;
