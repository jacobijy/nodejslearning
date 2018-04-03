window.onload = function () {

  //   var obj = JSON.parse("config.json");
  //   console.log(obj);
  var data;
  // this.postMessage();
  $.getJSON("/json/config.json", data,
    function (data, textStatus, jqXHR) {
      var client = mqtt.connect();
      var socket = io.connect('http://' + data.config.host + ':' + data.config.port);
      // console.log('socketid:',socket.id);
      console.log(socket);
      var messages = [];
      var field = document.getElementById("field");
      var sendButton = document.getElementById("send");
      var chatboard = document.getElementById("chatboard");
      //   var name = this.document.getElementById('name');

      socket.on('message', function (data) {
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
        socket.emit('send', { message: text, reciever: friendid, sender: userid });
        field.value = "";
      };
    }
  );

}