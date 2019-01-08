/* HW5 get and post - Mandi Grant (granaman) Summer 2018

Here's some sample data you can copy and paste into Postman (or similar):

GET:
/?make=Ford&model=Mustang&color=blue

POST:
set to "raw" and make sure the header is "application/json"
{
    "make": "Subaru",
    "model": "Forester",
    "color": "White"
}

POST also accepts data as query params in the URL:
/?make=Ford&model=Mustang&color=blue

Use header type of "application/x-www-form-urlencoded"
*/


var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

app.get('/',function(request, response) {
    var data = {params: '', requestType: ''};
    data.requestType = "Make a GET or a POST request";

    //grab the query params from the url (if any)
    var queryParams = [];
    for (var param in request.query) {
        queryParams.push({'name':param,'value':request.query[param]});
    }
    data.params = queryParams;

    if (queryParams.length > 0) {
        data.requestType = "GET Request Received";
    }
    response.render('index', data);
});


app.post('/', function(request, response) {
    var data = {params: '', requestType: ''};
    data.requestType = "Make a GET or a POST request";

    var params = [];
    if (request.query) {
        //the query params are always checked,
        //they might be in the url, or they might be
        //in the body. First, try to get them from the url.
        for (var param in request.query) {
            params.push({'name':param,'value':request.query[param]});
        }

        data.params = params;
        //console.log("request.query: ", request.query);

        //What if params was empty? If that's the case, take from the request.body
        //credit for checking if an object is empty: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
        if (Object.keys(request.query).length === 0 && request.query.constructor === Object) {
            //this will catch the params if they were given as json in the body
            for (var param in request.body) {
                params.push({'name':param,'value':request.body[param]});
            }
            data.params = params;

            //console.log("request.body: ", request.body);
        }

        data.requestType = "POST Request Received";
    }

    response.render('index', data);
});


//error response pages
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

//start server
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});



