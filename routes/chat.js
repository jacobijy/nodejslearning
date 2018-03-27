var express = require('express');
var config = require('../config');
var mysql = require('mysql');
var pool = mysql.createPool(config.mysqldb);
var router = express.Router();

router.use('/', function(req, res, next) {
  var auth_token = req.signedCookies[config.auth_cookiename];
  console.log(req.signedCookies);
  if (!auth_token) {
    return next();
  }
  var auth = auth_token.split('$$$$');
  var user_id = auth[0];
  pool.getConnection(function (err, connection) {  
    var query = 'SELECT username, userid FROM nodejs.users';
    connection.query(query, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
      }
      console.log(result);
      res.render('chat', {userid: user_id, user_list:result});
    })
    connection.release();
  })
})

module.exports = router;
