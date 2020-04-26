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
  res.sendfile(path.resolve(__dirname, '../public/login.html'));
});

router.get('/flightSearch', (req, res) => {
  res.sendfile(path.resolve(__dirname, '../public/index.html'));
});

router.get('/profile', (req, res) => {
  res.sendfile(path.resolve(__dirname, '../public/profile.html'));
});

module.exports = router;
