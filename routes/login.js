const express = require('express');
const passport = require('passport');

const user = require('../auth/user');

const router = express.Router();

router.post('/login', passport.authenticate('local'), user.login);

router.post('/logout', user.logout);

module.exports = router;
