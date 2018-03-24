var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');
var model_users = require('../models/users');
var EventProxy = require('eventproxy');
var ep = EventProxy();
var mysql = require('mysql');
var os = require('os');
var pool = mysql.createPool(config.mysqldb);
var check = require('../utils/check');

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

var checkUserAuthorized = function(username, password) {
  pool.getConnection(function(err, connection) {
    var query = 'SELECT * FROM users WHERE username=? AND password=?';
    var queryParams = [username, password];
    console.log(queryParams);
    connection.query(query, queryParams, function(err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
      }
      console.log(result);
      var date = Date();
      if (result.length > 0) {
        var updateQuery = 'UPDATE users SET `lastlogin`=?, `login_ip`=? WHERE username=? AND password=?'
        var updateParams = [date, check.getIPAdress(), result[0].username, result[0].password];
        console.log(updateParams);
        connection.query(query, queryParams, function(err, result) {
          if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
          }
          console.log(result);
          ep.emit('user_check_end', result);
        })
        return true;
      }
      else {
        ep.emit('user_check_end', result);
        return false;
      }
    });
    connection.release();
  })
  
}

router.post('/login', function(req, res, next) {
  console.log(req.body);
  checkUserAuthorized(req.body.username, req.body.password);
  ep.after('user_check_end', 1, function(result) {
    // console.log('debug', res.location);
    console.log(result);
    res.redirect('../chat');
  }) 
});

module.exports = router;
