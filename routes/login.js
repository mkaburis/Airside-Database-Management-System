const express = require('express');

const { authenticateUser } = require('../models/user');

const router = express.Router();

router.post('/login', async (req, res) => {
  const dashboardPath = '/dashboard';
  if (req.session.user !== undefined) {
    return res.redirect(dashboardPath);
    // return res.json({ dashUrl: dashboardPath, auth: true });
  }

  const { username, password } = req.query;

  const { user, message } = await authenticateUser(username, password);
  if (user == null) {
    return res.status(404).json({ message });
  }
  req.session.user = user;
  req.session.loggedin = true;
  return res.json({ dashUrl: dashboardPath, auth: true });
});

router.post('/logout', (req, res) => {
  req.session.user = null;
  req.session.loggedin = false;
  res.redirect('/login');
});

router.post('/profile', async (req, res) => {
  const { username, password } = req.query;

  const { user } = await authenticateUser(username, password);

  req.session.user = user;
  req.session.loggedin = true;
  res.redirect('/profile');
});

module.exports = router;
