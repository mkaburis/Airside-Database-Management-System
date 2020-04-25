const express = require('express');
const passport = require('passport');
const path = require('path');

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

router.post('/login', (req, res, next) => {
  if (req.isAuthenticated()) {
    authorizedRedirect(req.user);
  }

  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }

      const dashboardPath = authorizedRedirect(user);

      res.redirect(301, dashboardPath);
    });
    return res;
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/login.html');
});

module.exports = router;
