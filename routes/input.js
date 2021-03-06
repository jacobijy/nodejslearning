var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');
var check = require('../utils/check');
var EventProxy = require('eventproxy');

var ep = EventProxy();
var connection = mysql.createConnection(config.mysqldb);
connection.connect();

var checkAvailable = function(params) {
  console.log('checkavailable');
  for (var key in params) {
    var attribute = params[key];
    if (!attribute) {
      console.log(key +' doesn\'t exist');
      return false;      
    }
    if (key == 'url') {
      if (!check.checkURL(attribute)) {
        return false;
      }
    }
  }
  return true;
}

var addWebsiteInfo = function(params) {
  if (!checkAvailable(params)) {
    console.log('checkavailable false');
    return false;
  }
  var sql = 'SELECT name, url FROM websites WHERE name = ? OR url = ?';
  var queryParams = [params.name, params.url];
  connection.query(sql, queryParams, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    
    if (result.length > 0) {
      console.log('already exists');
    }
    else {
      console.log('new input');
      query_result = true;
      addWebsiteAttribute(params);
    }
  })
}

var addWebsiteAttribute = function(params) {
  var addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
  var sqlParams = [params.name, params.url, params.alexa, params.country];
  connection.query(addSql, sqlParams, function (err, result) {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
    }        
    ep.emit('insert_end', result);
    console.log('--------------------------INSERT----------------------------');
    //console.log('INSERT ID:',result.insertId);        
    console.log('INSERT ID:',result);        
    console.log('-----------------------------------------------------------------\n\n');  
  });
}

router.post('/', function(req, res, next) {
  var params = {
    name: req.body.name, 
    url: req.body.url, 
    alexa: req.body.alexa, 
    country: req.body.country
  };
  addWebsiteInfo(params);
  ep.after('insert_end', 1, function() {
    res.redirect('../');
    connection.end();
  })
})

module.exports = router;