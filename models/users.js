var mysql = require('mysql');
var config = require('../config');

mysql.createConnection(config.mysqldb);