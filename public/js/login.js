$(document).ready(function(){
    var loginForm = document.getElementById('login-form');

    loginForm.onsubmit = function(event) {
        //Stops the form from send the data before we intercept.
        event.preventDefault();

        var fd = new FormData(loginForm);
        var loginData = new URLSearchParams(fd);
        fetch("/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: loginData
        }).then(function(res) {
        if (res.ok) {
            alert("Thanks! You are now logged in.");
            window.location.href = "/";
        } else if (res.status == 401) {
            alert("Oops! You are not authorized.");
        }
        }, function(e) {
            alert("Error submitting form!");
        });
    };

    
});
