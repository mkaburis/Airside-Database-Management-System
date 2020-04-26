const express = require('express');

// const { getUserById } = require('../models/user');

const router = express.Router();

router.get('/', async (req, res) => {
  const { user } = req.session;

  if (user === undefined) {
    return res.status(401).json({ error: 'User lot logged in' });
  }

  const { username, permission } = user;

  return res.json({ name: username, access: permission });
});

module.exports = router;
