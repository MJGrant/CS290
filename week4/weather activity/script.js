document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
    //form 2 (send a string and get it back)
    document.getElementById('form2Submit').addEventListener('click', function(event) {
        //set up the request
        var req = new XMLHttpRequest();
        var payload = null;
        payload = document.getElementById('form2input').value;
        req.open('POST', 'http://httpbin.org/post');
        req.setRequestHeader('Content-Type', 'application/json');

        //this will run when the server responds
        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                document.getElementById('responseData').textContent = response.data;
                console.log(response);
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        //send off the data the user entered
        req.send(payload);
        event.preventDefault();
    });

    //form 1 (weather data)
    document.getElementById('zipcodeSubmit').addEventListener('click', function(event) {
        //set up the request
        var req = new XMLHttpRequest();
        var payload = {userInput:null};
        payload.userInput = document.getElementById('userInput').value;

        //run some simple validation on user input to determine if zipcode or city name
        reqValid = false;
        if (payload.userInput.match(/\b\d{5}\b/g)) {
            reqValid = true;
            req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?zip=' + payload.userInput + ',us&appid=fa7d80c48643dfadde2cced1b1be6ca1', false);
        } else if (payload.userInput.match(/^[a-zA-Z ]+$/)) {
            reqValid = true;
            req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + payload.userInput + ',us&appid=fa7d80c48643dfadde2cced1b1be6ca1', false);
        } else {
            console.log("Bad input");
        }

        //this will run later, once the response comes back
        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                var tempKelvin = response.main.temp;
                var tempFahrenheit = (tempKelvin * (9/5) - 459.67).toFixed(0);
                document.getElementById('userInputDisplay').textContent = payload.userInput;
                document.getElementById('tempDisplay').textContent = tempFahrenheit + String.fromCharCode(0186) + 'F';
                document.getElementById('humidityDisplay').textContent = response.main.humidity + '%';
                document.getElementById('conditionsDisplay').textContent = response.weather[0].description;
                document.getElementById('badInputDisplay').textContent = "";
            } else {
                console.log("Error in network request: " + req.statusText);
                if (req.status === 404) {
                    document.getElementById('badInputDisplay').textContent = "404 - City/Zipcode not found";
                }
            }
        });

        //send off the city or zipcode the user entered
        if (reqValid) {
            req.send(JSON.stringify(payload));
        } else {
            document.getElementById('badInputDisplay').textContent = "Bad input";
        }
        event.preventDefault();
    });
}
