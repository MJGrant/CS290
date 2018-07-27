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
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                console.log(response);
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        //send off the data the user entered
        req.send(JSON.stringify(payload));
        event.preventDefault();
    });
}
