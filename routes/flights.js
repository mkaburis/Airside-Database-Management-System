const express = require('express');
const { extractFlightNo, getFlights } = require('../models/flightLog');

const router = express.Router();

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

  const queryResults = await getFlights(airline, flightNum, arrivalAirport, departureAirport);

  if (queryResults.length < 1) {
    return res.status(404).json({ error: 'No flights found' });
  }

  return res.send(queryResults);
});

module.exports = router;
