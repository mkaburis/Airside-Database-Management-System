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
  if (rows.length < 1) {
    res.sendStatus(404).json({ error: 'user\'s information not found' });
  } else {
    res.send(rows[0]);
  }
});

/* Gets user's information about a specific flight */
router.get('/:userId/flights/:flightId', async (req, res) => {
  const { flightId, userId } = req.params;
  const { rows } = await db.query(
    'SELECT * FROM passengers'
    + ' INNER JOIN passengerflights ON passengers.passengerid = passengerflights.passengerid'
    + ' INNER JOIN flightlogs ON passengerflights.flightId = flightlogs.flightId'
    + ' WHERE passengers.passengerid = $1 AND flightlogs.flightId = $2',
    [userId, flightId]
  );

  if (rows.length < 1) {
    res.sendStatus(404).json({ error: `user's information about flight ${flightId} not found` });
  } else {
    res.send(rows[0]);
  }
});

/* Get a list of user's flights */
router.get('/:userId/flights', async (req, res) => {
  const { userId } = req.params;
  const { rows } = await db.query(
    'SELECT * FROM passengers'
    + ' INNER JOIN passengerflights ON passengers.passengerid = passengerflights.passengerid'
    + ' INNER JOIN flightlogs ON passengerflights.flightId = flightlogs.flightId'
    + ' WHERE passengers.passengerid = $1',
    [userId]
  );
  if (rows.length < 1) {
    res.sendStatus(404).json({ error: 'user\'s flight information not found' });
  } else {
    res.send(rows[0]);
  }
});

module.exports = router;
