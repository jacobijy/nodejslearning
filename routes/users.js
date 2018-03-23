var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  console.log(req.body);
  res.redirect('../');
});

router.post('/login', function(req, res, next) {
  res.redirect('../chat')
});

module.exports = router;
