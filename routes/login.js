const express = require('express');

const { authenticateUser } = require('../models/user');

const router = express.Router();

function authorizedRedirect(user) {
  if (user.permission === 1) {
    return '/passengerDashboard.html';
  }
  if (user.permission === 5) {
    return '/adminDashboard.html';
  }
  return '/staffDashboard.html';
}

router.post('/login', async (req, res) => {
  if (req.session.user != null) {
    const { user } = req.session;
    const dashboardPath = authorizedRedirect(user);
    return res.json({ dashUrl: dashboardPath, auth: true });
  }

  const { username, password } = req.query;

  const { user, message } = await authenticateUser(username, password);
  if (user == null) {
    return res.status(404).json({ message });
  }
  req.session.user = user;
  req.session.loggedin = true;
  const dashboardPath = authorizedRedirect(user);
  return res.json({ dashUrl: dashboardPath, auth: true });
});

router.post('/logout', (req, res) => {
  req.session.user = null;
  req.session.loggedin = false;
  res.redirect('/login.html');
});

module.exports = router;
