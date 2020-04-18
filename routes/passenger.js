const { Router } = require('express');
const db = require('../db/postgres');

const router = Router();

/* GET users info. */
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { rows } = await db.query('SELECT * FROM users WHERE userid = $1', [
    userId
  ]);
  res.send(rows);
  // res.send(`Info about a specific passenger with userId ${req.userId}`);
});

/* Get a list of user's flights */
router.get('/:userId/flights/:flightId', (req, res) => {
  const { flightId, userId } = req.params;
  res.send(`Info about flight ${flightId} for passenger ${userId}`);
});

/* Get a list of user's flights */
router.get('/:userId/flights', (req, res) => {
  const { userId } = req.params;
  res.send(`Info about a all flight taken by passenger ${userId}`);
});

module.exports = router;
