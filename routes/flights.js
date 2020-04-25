const express = require('express');
const db = require('../db/postgres');

const router = express.Router();

function extractFlightNo(flightNo) {
  const reAirline = /\d*[a-zA-Z]+\d*/;
  const reFlight = /\d{2,}/;
  const airline = reAirline.exec(flightNo);
  const flightNum = reFlight.exec(flightNo);

  return {
    airline: airline != null ? airline[0] : null,
    flightNum: flightNum != null ? flightNum[0] : null
  };
}

/* GET flight listing. */
/* Will add query parameters later */
router.get('/', async (req, res) => {
  let { flightNo, departureAirport, arrivalAirport } = req.query;

  let { airline, flightNum } = extractFlightNo(flightNo);
  if (airline === null && flightNum === null) {
    airline = '%';
    flightNum = '%';
  }
  if ((flightNum === null && airline !== null) || (flightNum !== null && airline === null)) {
    return res.Status(404).json({ error: 'Flight number must have airline and flight number' });
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
    + '= t2.routeid  WHERE flightno like $1 AND fliesto like $2 AND fliesfrom like $3 AND airlinecode like $4 and isactive=true'
    // + 'AND (departuretime > $5 AND arrivaltime < $6)'
    + 'ORDER BY departuretime, arrivaltime';
  const { rows } = await db.query(query, [
    flightNum, arrivalAirport, departureAirport, airline
    // flightNo, arrivalAirport, departureAirport, airline, yesterday, tommorow
  ]);
  if (rows.length < 1) {
    return res.status(404).json({ error: 'No flights found' });
  }

  return res.send(rows);
});

module.exports = router;
