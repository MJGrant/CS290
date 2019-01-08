document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
    document.getElementById('button-contact-form-submit').addEventListener('click', function(event) {
        //set up the request
        var req = new XMLHttpRequest();
        var payload = {};
        payload.name = document.getElementById('contact-form-from').value;
        payload.from = document.getElementById('contact-form-email').value;
        payload.to = "granaman@oregonstate.edu";
        payload.subject = document.getElementById('contact-form-subject').value;
        payload.text = document.getElementById('contact-form-text').value;
        //send POST request
        req.open('POST', '/contact');
        req.setRequestHeader('Content-Type', 'application/json');

        //this will run when the server responds
        req.addEventListener('load', function() {
            var responseID;
            var messageSpan = document.getElementById('email-submission-response');
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                if (response.yo.match(/[A-Za-z0-9\-.]{15,}/)) {
                    console.log("response id:", response.yo.match(/[A-Za-z0-9]{15,}/)[0]);
                    responseID = response.yo.match(/[A-Za-z0-9\-.]{15,}/)[0];
                    document.getElementById('email-submission-response').innerHTML = 'Message Sent!</br>View it by <a href="https://ethereal.email/message/' + responseID + '">clicking here</a>.';
                } else {
                    document.getElementById('email-submission-response').innerHTML = 'Message Sent!</br>Failed to generate link.';
                }
                document.getElementById("contact-us-form").reset();
            } else {
                console.log("Error in network request: " + req.statusText);
                responseID = "Error in network request.";
                document.getElementById('email-submission-response').innerHTML = 'Error in network request. Please try again.';
            }

        });
        //send off the data the user entered
        req.send(JSON.stringify(payload));
        event.preventDefault();
    });
}
