var mqtt = require('mqtt');
var config = require('../config');

var client = mqtt.connect('mqtt://'+config.host+':3010');
console.log(client);

client.on('connect', function () {
  console.log('connected.....');
  client.subscribe('#');
  client.publish('app2dev/', 'Hello mqtt');
});

client.on('message', function (topic, message) {
  // message is Buffer  
  console.log(message.toString());
  //client.end();  
});