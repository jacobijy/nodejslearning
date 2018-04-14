window.onload = function () {

  //   var obj = JSON.parse("config.json");
  //   console.log(obj);
  var data;
  // this.postMessage();
  $.getJSON("/json/config.json", data,
    function (data, textStatus, jqXHR) {
      var client = mqtt.connect({
        host: "172.26.164.243",
        port: 3011,
        protocol: "mqtt"
    });
      // socket.subscribe("mqtt/demo")
      console.log(client);
      // var socket = io.connect('ws://'+data.config.host+':'+data.config.port);
      var messages = [];
      var field = document.getElementById("field");
      var sendButton = document.getElementById("send");
      var chatboard = document.getElementById("chatboard");

      // client.connect({ onSuccess: onConnect });//连接服务器并注册连接成功处理事件  
      // function onConnect() {
      //   console.log("onConnected");
      //   client.subscribe("/topic_back");//订阅主题  
      // }
      // client.onConnectionLost = onConnectionLost;//注册连接断开处理事件  
      // client.onMessageArrived = onMessageArrived;//注册消息接收处理事件  
      // function onConnectionLost(responseObject) {
      //   if (responseObject.errorCode !== 0) {
      //     console.log("onConnectionLost:" + responseObject.errorMessage);
      //     console.log("连接已断开");
      //   }
      // }
      // function onMessageArrived(message) {
      //   console.log("收到消息:" + message.payloadString);
      // }
      // //发送消息  
      // message = new Paho.MQTT.Message("hello");
      // message.destinationName = "/topic";
      // client.send(message);

      client.on('connect', function () {
        console.log('connected.....');
        client.subscribe('#');
        client.publish('app2dev/', 'Hello mqtt');
      });

      client.on('message', function (data) {
        if (data.message) {
          messages.push(data);
          var html = '';
          for (var i = 0; i < messages.length; i++) {
            html += ('<b>' + messages[i].username ? messages[i].username : 'Server');
            html += ':' + messages[i].message + '<br />';
          }
          console.log(html);
          chatboard.innerHTML = html;
          chatboard.scrollTop = chatboard.scrollHeight;
        } else {
          console.log("There is a problem:", data);
        }
      });

      sendButton.onclick = function (data) {
        //   if (name == '') {
        //       alert('Select A Friend');
        //   }
        //   else {
        var text = field.value;
        console.log(data);
        client.emit('send', { message: text, reciever: friendid, sender: userid });
        field.value = "";
      };
    }
  );

}