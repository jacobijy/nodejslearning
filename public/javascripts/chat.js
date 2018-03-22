window.onload = function() {

  var messages = [];
  var socket = io.connect('http://localhost:3000');
  var field = document.getElementById("field");
  var sendButton = document.getElementById("send");
  var content = document.getElementById("content");
  var name = this.document.getElementById('name');

  socket.on('message', function (data) {
      if(data.message) {
          messages.push(data);
          console.log(data);
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
      if (name.value == '') {
          alert('Enter Your Name');
      }
      else {
        var text = field.value;
        socket.emit('send', { message: text, username : name.value});
        field.value = "";
      }
  };
}
