const express = require('express');

const router = express.Router();

/* GET flight listing. */
/* Will add query parameters later */
router.get('/', (req, res) => {
  res.send('Gets list of flights');
});

module.exports = router;
