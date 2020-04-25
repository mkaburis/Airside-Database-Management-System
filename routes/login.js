const express = require('express');
const passport = require('passport');
const path = require('path');

const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }

      if (user.permission === 1) {
        return res.redirect('/passengerDashboard.html');
      }
      if (user.permission === 5) {
        return res.redirect('/adminDashboard.html');
      }
      const pash = path.resolve(__dirname, '../public/staffDashboard.html');
      return res.redirect('/staffDashboard');
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/login.html');
});

module.exports = router;
