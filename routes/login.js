const express = require('express');
const path = require('path');

const router = express.Router();

/* GET users info. */
router.get('/', (req, res) => {
  const filePath = path.resolve(__dirname, '../public/login.html');
  res.sendFile(filePath);
});

module.exports = router;
