var express = require('express');
var router = express.Router();

/* GET trips listing. */
router.get('/', function(req, res, next) {
  // TODO: replace with non-stub data
  res.json([
    {
        id: 1234,
        name: "Yellowstone",
        startDate: new Date("2019-08-12"),
        endDate: new Date("2019-08-23"),
        budget: 5000,
    },
    {
        id: 5678,
        name: "Portland",
        startDate: new Date("2019-09-10"),
        endDate: new Date("2019-09-15"),
        budget: 600,
    }
  ]); 
});

router.post('/', function(req, res, next) {
    let userId = req.body.userId;

    let trip = {
        id: req.body.id,
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        budget: req.body.budget
    }

    console.log(`Parsed user ${userId} trip ${trip}`);
});

module.exports = router;
