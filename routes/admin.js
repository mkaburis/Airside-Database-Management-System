const express = require('express');

const { addUser, changePassword, getAllUsers } = require('../models/user');

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

module.exports = router;
