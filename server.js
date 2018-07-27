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
    var responseObj = {};
    // Generate test SMTP service account from ethereal.email
    //this means the mail doesn't actually get delivered to my email addreess
    //but it can be viewed by going to:
    //https://ethereal.email/message/MSGIDHERE (see server console for message id)
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
            } else {
                console.log('Message sent: ' + info.response);
                response.json({yo: info.response});
                responseObj.emailRes = "Message sent! View it at: info.response";
            }
        });
    });

    //reload the contact page
    response.render('contact', responseObj);
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

var sendEmail = function() {
    console.log("sent email!");
};

//start server
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});



