const express = require('express');
const bcrypt = require('bcryptjs');

const { addUser } = require('../models/user');

const router = express.Router();

router.post('/addUser', async (req, res) => {
  const { username, password, permission } = req.body;
  const saltRounds = 10;

  let permissionInt = -1;
  if (permission === 'staff') {
    permissionInt = 1;
  }
  if (permission === 'admin') {
    permissionInt = 2;
  }

  const success = bcrypt.hash(password, saltRounds)
    .then((hash) => addUser(username, hash, permissionInt))
    .catch((e) => {
      console.log(e);
      return false;
    });

  if (success) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

/* GET users listing. */
router.get('/:employeeId', (req, res) => {
  const { employeeId } = req.params;
  res.send(`Info about employee ${employeeId}`);
});

module.exports = router;
