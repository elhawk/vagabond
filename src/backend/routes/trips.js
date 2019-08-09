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

module.exports = router;
