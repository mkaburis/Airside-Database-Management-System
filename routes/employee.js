const express = require('express');

const router = express.Router();

router.param('employeeId', (req, res, next, employeeId) => {
  req.employeeId = employeeId;
  next();
});

router.param('flightId', (req, res, next, flightId) => {
  req.flightId = flightId;
  next();
});

router.param('passengerId', (req, res, next, passengerId) => {
  req.passengerId = passengerId;
  next();
});

/* GET users listing. */
router.get('/:employeeId', (req, res) => {
  res.send(`Info about employee ${req.employeeId}`);
});

/* Post checkin a passgner to a flight. */
router.post(
  '/:employeeId/flight/:flightId/checkin/:passengerId',
  (req, res) => {
    res.send(
      `${req.employeeId} checked in ${req.passengerId} for flight ${req.flightId}`
    );
  }
);

module.exports = router;
