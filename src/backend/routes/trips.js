var express = require('express');
var router = express.Router();

/* GET trips listing. */
router.get('/', function(req, res, next) {
  // TODO: replace with non-stub data
  res.json([
    {
        id: "2ee4dcdc-a2e6-4246-80db-3aa5af5ec795",
        name: "Yellowstone",
        startdate: new Date("2019-08-12"),
        enddate: new Date("2019-08-23"),
        budget: 5000,
    },
    {
        id: "7466fe95-55b8-407d-a34a-1f1b8d3aede6",
        name: "Portland",
        startdate: new Date("2019-09-10"),
        enddate: new Date("2019-09-15"),
        budget: 600,
    }
  ]); 
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    let userId = req.body.userId;

    let trip = {
        id: req.body.id,
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        budget: req.body.budget
    }

    console.log(`Parsed user ${userId} trip ${trip}`);

    res.end();
});

module.exports = router;
