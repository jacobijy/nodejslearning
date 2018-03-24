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
var validator = require('validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  console.log(req.body);
  var date = new Date();
  var username = req.body.username;
  var password = req.body.password;
  var passwordex = req.body.passwordex;
  var email = req.body.email;
  ep.fail(next);

  // 验证信息的正确性
  if ([username, password, passwordex, email].some(function (item) { return item === ''; })) {
    ep.emit('prop_err', '信息不完整。');
    return;
  }
  if (username.length < 5) {
    ep.emit('prop_err', '用户名至少需要5个字符。');
    return;
  }
  if (!check.validateId(username)) {
    return ep.emit('prop_err', '用户名不合法。');
  }
  if (!validator.isEmail(email)) {
    return ep.emit('prop_err', '邮箱不合法。');
  }
  if (password !== passwordex) {
    return ep.emit('prop_err', '两次密码输入不一致。');
  }
  pool.getConnection(function(err, connection) {
    var updateQuery ='INSERT INTO users(username, useremail, signdate, lastlogin, password, login_ip) VALUES(?,?,?,?,?,?)';
    var updateParams = [username, email, check.formateDateForMysql(date, true), check.formateDateForMysql(date, false), password, check.getIPAdress()];
    connection.query(updateQuery, updateParams, function(err, result) {
      if (err) {
        console.log('[UPDATE ERROR] - ', err.message);
        return;
      }
      console.log(result);
      res.redirect('../');
      })
    })
});

var checkUserAuthorized = function(username, password) {
  pool.getConnection(function(err, connection) {
    var updateQuery = 'UPDATE users SET `lastlogin`=?, `login_ip`=? WHERE username=? AND password=?'
    var date = new Date();

    var updateParams = [check.formatDate(date, false), check.getIPAdress(), username, password];
    console.log(updateParams);
    connection.query(updateQuery, updateParams, function(err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    console.log(result);
    ep.emit('user_check_end', result);
    })
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
