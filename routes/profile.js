const express = require('express');

const { checkPassword, changePassword } = require('../models/user');

const router = express.Router();

router.post('/update', async (req, res) => {
  const { username, currentpassword, newpassword } = req.query;


  if (!checkPassword(username, currentpassword)) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  changePassword(username, newpassword);
  return res.json({ changePassword: true });
});

router.get('/', async (req, res) => {
  const { user } = req.session;

  if (user === undefined) {
    return res.status(401).json({ error: 'User not logged in' });
  }

  const { username, permission } = user;

  return res.json({ name: username, access: permission });
});


module.exports = router;
