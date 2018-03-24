var mysql = require('mysql');
var config = require('../config');
var EventProxy = require('eventproxy');
var ep = EventProxy();

var connection = mysql.createConnection(config.mysqldb);


connection.end();