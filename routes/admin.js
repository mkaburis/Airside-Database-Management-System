const express = require('express');

const { addUser, changePassword, getAllUsers } = require('../models/user');

const { getDestinations, deleteDestination } = require('../models/destination');

const router = express.Router();

router.post('/addUser', async (req, res) => {
  const { username, permission } = req.query;
  const password = 'password';

  const { user } = req.session;
  if (user === undefined || user.permission !== 'Admin') {
    return res.sendStatus(403);
  }

  const success = await addUser(username, password, permission);

  if (success) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

router.post('/changeUserPassword', async (req, res) => {
  const { password } = req.body;
  const { username, permission } = req.session.user;

  if (permission !== 'Admin') {
    res.sendStatus(403);
  }

  const success = await changePassword(username, password);

  if (success) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

/* GET users listing. */
router.get('/getUsers', async (req, res) => {
  const { permission } = req.query;

  const { user } = req.session;
  if (user === undefined || user.permission !== 'Admin') {
    return res.sendStatus(403);
  }

  const results = await getAllUsers(permission);

  res.json(results);
});

/* GET destinations listing */
router.get('/getDestinations', async (req, res) => {
  let {
    airportCode, city, administrativeDivision, country
  } = req.query;
  console.log(`Initial values: airportCode:${airportCode} city:${city} admin:${administrativeDivision} country:${country}`);

  if (airportCode === '') {
    airportCode = '%';
  }

  if (city === '') {
    city = '%';
  }

  if (administrativeDivision === '') {
    administrativeDivision = '%';
  }

  if (country === '') {
    country = '%';
  }

  console.log(`${airportCode} ${city}`);

  // This line works for some reason
  // const queryResults = await getDestinations('TPA', '%', '%', '%');
  console.log('this is not good lol');
  const queryResults = await getDestinations(airportCode, city, administrativeDivision, country);

  if (queryResults.count < 1) {
    return res.status(404).json({ error: 'No destinations found' });
  }

  return res.send(queryResults);
});

router.post('/deleteDestination', async (req, res) => {
  const { airportCode } = req.query;

  const success = deleteDestination(airportCode);

  if (success === true) {
    return res.status(200).json({ message: 'Destination deleted successfully' });
  }
  return res.status(500).json({ message: 'Error deleting destination' });
});

module.exports = router;
