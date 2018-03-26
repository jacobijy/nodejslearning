window.onload = function() {

//   var obj = JSON.parse("config.json");
//   console.log(obj);  
  var messages = [];
  var socket = io.connect('http://10.0.0.14:3000');
  var field = document.getElementById("field");
  var sendButton = document.getElementById("send");
  var content = document.getElementById("content");
//   var name = this.document.getElementById('name');

  socket.on('message', function (data) {
      if(data.message) {
          messages.push(data);
          var html = '';
          for(var i=0; i<messages.length; i++) {
              html += ('<b>' + messages[i].username ? messages[i].username :'Server');
              html += ':' + messages[i].message + '<br />';
          }
          console.log(html);
          content.innerHTML = html;
          content.scrollTop = content.scrollHeight;
      } else {
          console.log("There is a problem:", data);
      }
  });

  sendButton.onclick = function() {
    //   if (name == '') {
    //       alert('Select A Friend');
    //   }
    //   else {
        var text = field.value;
        socket.emit('send', { message: text, username : name, userid : userid});
        field.value = "";
    //   }
  };
}