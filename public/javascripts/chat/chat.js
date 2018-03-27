window.onload = function () {

  //   var obj = JSON.parse("config.json");
  //   console.log(obj);
  var data;
  var socket;
  // this.postMessage();
  $.getJSON("/json/config.json", data,
    function (data, textStatus, jqXHR) {
      socket = io.connect('http://' + data.config.host + ':' + data.config.port);
      var messages = [];
      var field = document.getElementById("field");
      var sendButton = document.getElementById("send");
      var content = document.getElementById("content");
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
          content.innerHTML = html;
          content.scrollTop = content.scrollHeight;
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
        socket.emit('send', { message: text, username: name, userid: userid });
        field.value = "";
      };
    }
  );

}