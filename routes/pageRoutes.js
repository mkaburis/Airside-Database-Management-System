const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/staffDashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendfile(path.resolve(path, '../public/staffDashboard.html'));
  } else {
    res.redirect('/login.html');
  }
});

router.get('/login', (req, res) => {
  res.sendfile(path.resolve(path, '../public/login.html'));
});

router.get('/flightSearch', (req, res) => {
  res.sendfile(path.resolve(path, '../public/index.html'));
});

module.exports = router;