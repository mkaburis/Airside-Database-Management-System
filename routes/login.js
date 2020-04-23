const express = require('express');
const passport = require('passport');
const db = require('../db/postgres');

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {

});

router.post('/logout', (req, res) => {

});

module.exports = router;
