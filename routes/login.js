const express = require('express');
const passport = require('passport');

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

  passport.authenticate('local', (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.redirect('/login');
    }
    let dashboardPath;
    req.logIn(user, (err) => {
      if (err) { return next(err); }

      dashboardPath = authorizedRedirect(user);
      return res;
    });
    req.session.save();
    console.log(req.session);
    return res.json({ dashUrl: dashboardPath, auth: true });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/login.html');
});

module.exports = router;
