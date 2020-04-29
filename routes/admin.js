const express = require('express');

const {
  addUser, getAllUsers, changePemission, deleteUser
} = require('../models/user');

const { getDestinations, deleteDestination, updateDestination } = require('../models/destination');

const router = express.Router();

// User APIs

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

router.put('/togglePermission', async (req, res) => {
  const { userId, level } = req.query;
  const { permission } = req.session.user;

  if (permission !== 'Admin') {
    res.sendStatus(403);
  }

  const success = await changePemission(userId, level); // await function (userId);

  if (success) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

router.delete('/deleteUser', async (req, res) => {
  const { userId } = req.query;
  const { id, permission } = req.session.user;

  if (userId === id) {
    res.sendStatus(403);
  }

  const success = await deleteUser(userId, permission); // await function (userId);

  if (success) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});


// Destination APIs

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

  const queryResults = await getDestinations(airportCode, city, administrativeDivision, country);

  if (queryResults.count < 1) {
    return res.status(404).json({ error: 'No destinations found' });
  }

  return res.send(queryResults);
});

/* Delete Destination Listing */
router.delete('/deleteDestination', async (req, res) => {
  const { airportCode } = req.query;

  console.log(`Airport code to delete is ${airportCode}`);

  const success = await deleteDestination(airportCode);

  if (success === true) {
    return res.status(200).json({ message: 'Destination deleted successfully' });
  }
  return res.status(500).json({ message: 'Error deleting destination' });
});

/* Update Destination Listing */
router.patch('/updateDestination', async (req, res) => {
  const {
    airportCode, airportName, city, administrativeDivision, country
  } = req.query;

  const success = await updateDestination(airportCode, airportName, city, administrativeDivision,
    country);

  if (success === true) {
    return res.status(200).json({ message: 'Destination updated successfully' });
  }
  return res.status(500).json({ message: 'Error updating destination' });
});

module.exports = router;
