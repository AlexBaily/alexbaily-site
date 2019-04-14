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

    var registerForm = document.getElementById('register-form');

    registerForm.onsubmit = function(event) {
        //Stops the form from send the data before we intercept.
        event.preventDefault();

        var fd = new FormData(registerForm);
        const data = new URLSearchParams(fd);
        fetch("/api/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        }).then(function(res) {
        if (res.ok) {
            alert("Thanks! You are almost there, " + 
            "please follow the verification link sent via email to " +
            "finish registration.");
        } else if (res.status == 401) {
            alert("Oops! You are not authorized.");
        }
        }, function(e) {
            alert("Error submitting form!");
        });
    }

    var confirmForm = document.getElementById('confirmation-form');

    confirmForm.onsubmit = function(event) {
        //Stops the form from send the data before we intercept.
        event.preventDefault();

        var fd = new FormData(confirmrForm);
        const data = new URLSearchParams(fd);
        fetch("/register/confirm", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        }).then(function(res) {
        if (res.ok) {
            alert("Thanks! You are now confirmed.");
        } else if (res.status == 401) {
            alert("Oops! You are not authorized.");
        }
        }, function(e) {
            alert("Error submitting form!");
        });
    }

    
});
