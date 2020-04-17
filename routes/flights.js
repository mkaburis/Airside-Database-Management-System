var express = require('express');
var router = express.Router();

/* GET flight listing. */
/* Will add query parameters later */ 
router.get('/', function(req, res, next) {
  res.send('Gets list of flights');
});



module.exports = router;