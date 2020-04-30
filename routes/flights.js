const express = require('express');
const { extractFlightNo, getFlights } = require('../models/flightLog');

const router = express.Router();

/* GET flight listing. */
router.get('/simple', async (req, res) => {
  const { flightNo, departureAirport, arrivalAirport } = req.query;

  const { airline, flightNum } = extractFlightNo(flightNo);

  if ((flightNum === null && airline !== null) || (flightNum !== null && airline === null)) {
    const error = 'Flight number must have airline and flight number';
    return res.status(404).json(error);
  }

  const param = [];
  const values = [];

  if (flightNum !== null) {
    param.push({ field: 'flightno', op: 'like' });
    values.push(flightNum.trim());
  }
  if (airline !== null) {
    param.push({ field: 'airlinecode', op: 'like' });
    values.push(airline.trim());
  }

  if (arrivalAirport.trim() !== '') {
    param.push({ field: 'fliesto', op: 'like' });
    values.push(arrivalAirport.trim());
  }
  if (departureAirport.trim() !== '') {
    param.push({ field: 'fliesfrom', op: 'like' });
    values.push(departureAirport.trim());
  }

  param.push({ field: 'isactive', op: '=' });
  values.push(true);


  const queryResults = await getFlights(param, values);

  if (queryResults.length < 1) {
    return res.status(404).json({ error: 'No flights found' });
  }

  return res.json(queryResults);
});

router.get('/advanced', async (req, res) => {
  const {
    flightNo, departureAirport, arrivalAirport, option, before, after
  } = req.query;

  const { airline, flightNum } = extractFlightNo(flightNo);

  const param = [];
  const values = [];

  if (flightNum !== null) {
    param.push({ field: 'flightno', op: 'like' });
    values.push(flightNum.trim());
  }
  if (airline !== null) {
    param.push({ field: 'airlinecode', op: 'like' });
    values.push(airline.trim());
  }

  if (arrivalAirport.trim() !== '') {
    param.push({ field: 'fliesto', op: 'like' });
    values.push(arrivalAirport.trim());
  }
  if (departureAirport.trim() !== '') {
    param.push({ field: 'fliesfrom', op: 'like' });
    values.push(departureAirport.trim());
  }

  if (before !== '') {
    const dateStr = Date.parse(before);
    const date = new Date(dateStr)
    param.push({ field: 'arrivaltime', op: '>' });
    values.push(date);
  }
  if (after !== '') {
    const dateStr = Date.parse(after);
    const date = new Date(dateStr)
    param.push({ field: 'departuretime', op: '<' });
    values.push(date);
  }

  if (option === 'Active') {
    param.push({ field: 'isactive', op: '=' });
    values.push(true);
  }
  if (option === 'InActive') {
    param.push({ field: 'isactive', op: '=' });
    values.push(false);
  }

  if (option === 'Delayed') {
    param.push({ field: 'isdelayed', op: '=' });
    values.push(true);
  }
  if (option === 'OnTime') {
    param.push({ field: 'isdelayed', op: '=' });
    values.push(false);
  }

  const queryResults = await getFlights(param, values);

  if (queryResults.length < 1) {
    return res.status(404).json({ error: 'No flights found' });
  }

  return res.json(queryResults);
});
module.exports = router;
