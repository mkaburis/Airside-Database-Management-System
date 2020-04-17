var express = require('express');
var router = express.Router();

router.param("userId", (req, res, next, userId) =>{
  console.log(req);
  req.userId = userId;
  next();
})

router.param("flightId", (req, res, next, flightId) =>{
  req.flightId = flightId;
  next();
})

/* GET users info. */
router.get('/:userId', function(req, res, next) {
  res.send(`Info about a specific passenger with userId ${req.userId}`);
});

/* Get a list of user's flights */
router.get('/:userId/flights/:flightId', function(req, res, next) {
  res.send(`Info about flight ${flightId} for passenger ${req.userId}`);
});


/* Get a list of user's flights */
router.get('/:userId/flights', function(req, res, next) {
  res.send(`Info about a all flight taken by passenger ${req.userId}`);
});

module.exports = router;
