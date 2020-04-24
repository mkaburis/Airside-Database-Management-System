const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/login', passport.authenticate('local', {
  successRedirect: '/staffDashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

router.post('/logout', (req, res) => {

});

module.exports = router;
