$(document).ready(function(){
  $.get("/api/messages", function(data, status) {
    var list = document.getElementById("messageList");
    var messages = data.message;

    messages.forEach(function(message) {
      var entry = document.createElement('li');
      entry.appendChild(document.createTextNode(message));
      list.appendChild(entry);
    });
    console.log(data);
  });
});
