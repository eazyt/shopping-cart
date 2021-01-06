var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // insert future code
  res.render('main/index', { title: 'Express2' });
});

module.exports = router;
