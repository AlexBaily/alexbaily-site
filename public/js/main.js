$(document).ready(function(){
    var registerForm = document.getElementById('register-form');

    registerForm.onsubmit = function(event) {
        //Stops the form from send the data before we intercept.
        event.preventDefault();

        var fd = new FormData(registerForm);
        var data = new URLSearchParams(fd);
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
            res.text().then((s) => alert(s));
        }
        }, function(e) {
            alert("Error submitting form!");
        });
    };

});
