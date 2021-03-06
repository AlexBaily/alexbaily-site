$(document).ready(function(){
    var confirmForm = document.getElementById('confirmation-form');

    confirmForm.onsubmit = function(event) {
        //Stops the form from send the data before we intercept.
        event.preventDefault();

        var fdconfirm = new FormData(confirmForm);
        var confirmData = new URLSearchParams(fdconfirm);
        fetch("/api/register/confirm", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: confirmData
        }).then(function(res) {
        if (res.ok) {
            alert("Thanks! You are now confirmed.");
            window.location.href = "/login";
        } else if (res.status == 401) {
            alert("Oops! You are not authorized.");
        }
        }, function(e) {
            alert("Error submitting form!");
        });
    };

    
});
