function getMessages() {
  document.getElementById("messageList").innerHTML = "test";
}


$(document).ready(function(){
  $.get("/api/messages", function(data, status) {
    document.getElementById("messageList").innerHTML = data.message;
    console.log(data);
  });
});
