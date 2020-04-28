const { Router } = require('express');
const { getPassengerById } = require('../models/passenger');
const { getPassengerFlightList, getPassengerFlight } = require('../models/flightLog');

const router = Router();

/* GET users info. */
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const passenger = await getPassengerById(userId);

  if (passenger == null) {
    return res.status(404).json({ message: 'Passenger not found' });
  }

  res.json(passenger);
});

/* Gets user's information about a specific flight */
router.get('/:userId/flights/:flightId', async (req, res) => {
  const { flightId, userId } = req.params;

  const result = await getPassengerFlight(userId, flightId);

  if (result == null) {
    return res.status(404).json({ message: 'Passenger not found' });
  }

  res.json(result);
});

/* Get a list of user's flights */
router.get('/:userId/flights', async (req, res) => {
  const { userId } = req.params;

  const result = await getPassengerFlightList(userId);

  if (result == null) {
    return res.status(404).json({ message: 'No flights found' });
  }

  res.json(result);
});

module.exports = router;
