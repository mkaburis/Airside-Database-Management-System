const { Router } = require('express');

const router = Router();

router.param('userId', (req, res, next, userId) => {
  console.log(req);
  req.userId = userId;
  next();
});

router.param('flightId', (req, res, next, flightId) => {
  req.flightId = flightId;
  next();
});

/* GET users info. */
router.get('/:userId', (req, res) => {
  res.send(`Info about a specific passenger with userId ${req.userId}`);
});

/* Get a list of user's flights */
router.get('/:userId/flights/:flightId', (req, res) => {
  res.send(`Info about flight ${req.flightId} for passenger ${req.userId}`);
});

/* Get a list of user's flights */
router.get('/:userId/flights', (req, res) => {
  res.send(`Info about a all flight taken by passenger ${req.userId}`);
});

module.exports = router;
