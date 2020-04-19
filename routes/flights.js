const express = require('express');
const db = require('../db/postgres');

const router = express.Router();

/* GET flight listing. */
/* Will add query parameters later */
router.get('/', async (req, res) => {
  let { flightNo, departureAirport, arrivalAirport } = req.query;

  if (flightNo === '') {
    flightNo = '%';
  }
  if (arrivalAirport === '') {
    arrivalAirport = '%';
  }
  if (
    departureAirport === '') {
    departureAirport = '%';
  }

  const query = 'SELECT * FROM routes WHERE flightno like $1 AND fliesto like $2 AND fliesfrom like $3';

  const {
    rows
  } = await db.query(query, [
    flightNo, arrivalAirport, departureAirport
  ]);
  if (rows.length < 1) {
    res.sendStatus(404).json({ error: 'No flights found' });
  } else {
    res.send(rows);
  }
});

module.exports = router;
