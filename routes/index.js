var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

  var connection = mysql.createConnection(config.mysqldb);
  connection.connect();
  var  sql = 'SELECT * FROM websites';
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }

    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
  });
});

module.exports = router;
