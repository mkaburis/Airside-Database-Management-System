const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../db/postgres');

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

/* Post checkin a passgner to a flight. */
router.post(
  '/:employeeId/flight/:flightId/checkin/:passengerId',
  (req, res) => {
    res.send(
      `${req.employeeId} checked in ${req.passengerId} for flight ${req.flightId}`
    );
  }
);

router.post('/addUser', async (req, res) => {
  const { username, password, permission } = req.body;
  const saltRounds = 10;

  let permissionInt = -1;
  if (permission === 'passenger') {
    permissionInt = 1;
  }
  if (permission === 'admin') {
    permissionInt = 4;
  }

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      return;
    }
    const query = 'INSERT INTO .users(username, password, permission) VALUES ($1, $2, $3)';

    const result = await db.query(query, [username, hash, permissionInt]);

    res.send(result);
  });
});

/* GET users listing. */
router.get('/:employeeId', (req, res) => {
  res.send(`Info about employee ${req.employeeId}`);
});

module.exports = router;
