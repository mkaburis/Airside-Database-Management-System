var express = require('express');
var path = require('path');
var router = express.Router();

/* GET users info. */
router.get('/', function(req, res) {
    var filePath = path.resolve(__dirname, '../public/login.html')
    res.sendFile(filePath)
});


module.exports = router;
