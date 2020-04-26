const express = require('express');

const { addUser, changePassword } = require('../models/user');

const router = express.Router();

router.post('/addUser', async (req, res) => {
  const { username, password, permission } = req.body;

  const { userPermission } = req.session.user;

  if (userPermission !== 'Admin') {
    res.sendStatus(403);
  }


  let permissionInt = -1;
  if (permission === 'staff') {
    permissionInt = 1;
  }
  if (permission === 'admin') {
    permissionInt = 2;
  }

  const success = addUser(username, password, permissionInt);

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

  const success = changePassword(username, password);

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
