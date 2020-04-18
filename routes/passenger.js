const { Router } = require('express');
const db = require('../db/postgres');

const router = Router();

/* GET users info. */
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const {
    rows
  } = await db.query('SELECT * FROM passenger WHERE passengerid = $1', [
    userId
  ]);
  res.send(rows);
  // res.send(`Info about a specific passenger with userId ${req.userId}`);
});

/* Get a list of user's flights */
router.get('/:userId/flights/:flightId', async (req, res) => {
  const { flightId, userId } = req.params;
  const { rows } = await db.query(
    'SELECT * FROM passengers'
    + ' INNER JOIN passengerflights ON passengers.passengerid = passengerflights.passengerid'
    + ' INNER JOIN flightlogs ON passengerflights.flightId = flightlogs.flightId'
    + ' WHERE passengers.passengerid = $1 AND flightlogs.flightId = $2',
    [userId, flightId]
  );
  res.send(rows);
});

/* Get a list of user's flights */
router.get('/:userId/flights', (req, res) => {
  const { userId } = req.params;
  res.send(`Info about a all flight taken by passenger ${userId}`);
});

module.exports = router;
