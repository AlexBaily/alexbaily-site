$(document).ready(function(){
    var confirmForm = document.getElementById('confirmation-form');

    confirmForm.onsubmit = function(event) {
        //Stops the form from send the data before we intercept.
        event.preventDefault();

        var fdconfirm = new FormData(confirmForm);
        var confirmdata = new URLSearchParams(fdconfirm);
        fetch("/api/register/confirm", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: confirmdata
        }).then(function(res) {
        if (res.ok) {
            alert("Thanks! You are now confirmed.");
        } else if (res.status == 401) {
            alert("Oops! You are not authorized.");
        }
        }, function(e) {
            alert("Error submitting form!");
        });
    };

    
});
