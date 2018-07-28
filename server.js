/* Project - Mandi Grant (granaman) Summer 2018
*/

var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        helpers: {
        year: function() {
            return new Date().getFullYear();
        }
    }
});
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');

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

/* nodemailer.com/about helped a lot with configuring this */
app.post('/contact', function(request, response) {
    // Generate test SMTP service account from ethereal.email
    //this means the mail doesn't actually get delivered to my email addreess
    //but it can be viewed by going to the ethereal URL that is generated
    nodemailer.createTestAccount(function(err, account) {
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
            }
        });

        var mailOptions = request.body;
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                response.json({yo: 'error'});
                responseObj.emailRes = "Error! Message not sent!";
                response.status(500, error);
            } else {
                console.log('Message sent: ' + info.response);
                response.json({yo: info.response});
                responseObj.emailRes = "Message sent! View it at: info.response";
            }
        });
    });
});

app.get('/download',function(request, response) {
    response.render('download');
});

app.get('/privacy',function(request, response) {
    response.render('privacy');
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



