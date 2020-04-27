const express = require('express');

const { checkPassword, changePassword } = require('../models/user');

const router = express.Router();

router.post('/update', async (req, res) => {
  const { currentpassword, newpassword } = req.query;

  const { user } = req.session;

  if (user === undefined) {
    return res.redirect('/login');
  }

  const isValidPassword = await checkPassword(user, currentpassword);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }

  const success = await changePassword(user, newpassword);

  if (success === true) {
    return res.status(200).json({ message: 'Password changed successfully' });
  }
  return res.status(500).json({ message: 'Error changing password' });
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
