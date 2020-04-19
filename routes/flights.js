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

  /*
    // For use in production
    const today = new Date();
    const day = 60 * 60 * 24 * 1000;

    const yesterday = new Date(today.getTime() - day);
    const tommorow = new Date(today.getTime() + day);

  */
  const query = 'SELECT * FROM routes AS t1 LEFT JOIN flightlogs AS t2 ON t1.routeid '
    + '= t2.routeid  WHERE flightno like $1 AND fliesto like $2 AND fliesfrom like $3 '
    // + AND (departuretime > $4 AND arrivaltime < $5)';
    + 'ORDER BY departuretime, arrivaltime';
  const { rows } = await db.query(query, [
    flightNo, arrivalAirport, departureAirport
    // flightNo, arrivalAirport, departureAirport, yesterday, tommorow
  ]);
  if (rows.length < 1) {
    res.status(404).json({ error: 'No flights found' });
  } else {
    res.send(rows);
  }
});

module.exports = router;
