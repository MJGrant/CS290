/* Project - Mandi Grant (granaman) Summer 2018
*/

var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create(
    {
        defaultLayout:'main',
        helpers: {
        year: function() {return new Date().getFullYear();}
    }
});
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

app.get('/',function(request, response) {
    response.render('index');
});

app.get('/about',function(request, response) {
    response.render('about');
});

app.get('/contact',function(request, response) {
    response.render('contact');
});

app.get('/download',function(request, response) {
    response.render('download', pageData);
});

app.get('/privacy',function(request, response) {
    response.render('privacy', pageData);
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



