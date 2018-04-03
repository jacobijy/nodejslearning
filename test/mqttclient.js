var mqtt = require('mqtt');

var client = mqtt.connect('mqtt://192.168.137.19:3010');

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