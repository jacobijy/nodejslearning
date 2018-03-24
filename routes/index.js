var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');

var connection = mysql.createConnection(config.mysqldb);
/* GET home page. */
router.get('/', function(req, res, next) {
  // connection.connect();
  // var query = 'SELECT * FROM users';
  // connection.query(query, function(err, result) {
  //   if(err) {
  //     console.log('[SELECT ERROR] - ', err.message);
  //     return;
  //   }
  //   res.render('index', { 
  //     title: 'Express',
  //     result: result
  //   });
  // });
  // connection.end();
  res.render('index', {title: 'Chat'})
});

module.exports = router;
