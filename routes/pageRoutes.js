const express = require('express');
const path = require('path');

const router = express.Router();

function isAuthenticated(req, res, next) {
  const { loggedin } = req.session;

  if (loggedin === undefined) {
    return res.redirect('/login');
  }
  return next();
}

router.get('/staffDashboard', isAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/staffDashboard.html'));
});

router.get('/adminDashboard', isAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/adminDashboard.html'));
});

router.get('/dashboard', isAuthenticated, (req, res) => {
  const { permission } = req.session.user;

  if (permission === 'Staff') {
    res.sendFile(path.resolve(__dirname, '../public/staffDashboard.html'));
  }
  if (permission === 'Admin') {
    res.sendFile(path.resolve(__dirname, '../public/adminDashboard.html'));
  }
});

router.get('/login', (req, res) => {
  const { loggedin } = req.session;
  if (loggedin) {
    return res.redirect('/dashboard');
  }
  res.sendFile(path.resolve(__dirname, '../public/login.html'));
});

router.get('/flightSearch', (req, res) => {
  const { loggedin } = req.session;

  const file = (loggedin) ? 'staffFlightSearch.html' : 'index.html';

  return res.sendFile(path.resolve(__dirname, '../public/', file));
});

router.get('/profile', isAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/profile.html'));
});

router.get('/users', isAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/users.html'));
});

router.get('/destinations', isAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/destinations.html'));
});


module.exports = router;
