var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');

var connection = mysql.createConnection(config.mysqldb);
router.post('/', function(req, res, next) {
  var params = {
    name: req.body.name, 
    url: req.body.url, 
    alexa: req.body.alexa, 
    country: req.body.country
  };
  inputwebsite(params);
})

var inputwebsite = function(params) {
  var addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
  if (!checkExist(params)) {
    console.log('lack of infomation or already exists');
    return;
  }
  var sqlParams = [params.name, params.url, params.alexa, params.country];
  connection.query(addSql, sqlParams, function (err, result) {
    if(err){
     console.log('[INSERT ERROR] - ',err.message);
     
    }        

   console.log('--------------------------INSERT----------------------------');
   //console.log('INSERT ID:',result.insertId);        
   console.log('INSERT ID:',result);        
   console.log('-----------------------------------------------------------------\n\n');  
  });
}

var checkAvailable = function(params) {
  console.log('checkavailable');
  for (var key in params) {
    var attribute = params[key];
    if (!attribute) {
      console.log(key +' doesn\'t exist');
      return false;      
    }
  }
  return true;
}

var checkExist = function(params) {
  console.log('checkExist');
  if (!checkAvailable(params)) {
    console.log('checkavailable false');
    return false;
  }
  var websites_list;
  var sql = 'SELECT * FROM websites';
  connection.query(sql, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    
    // console.log(result);       
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');

    for (var key1 in result) {
      const RowDataPacket  = result[key1];
      console.log(RowDataPacket);
      var is_exist = RowDataPacket['name'] == params.name || RowDataPacket['url'] == params.url;
      if (is_exist) {
        return false;
      }
    }
  });
  
  return true;
}

module.exports = router;