

const express = require('express'),
      path = require('path'),
      favicon = require('serve-favicon'),
      bodyParser = require('body-parser'),
      request = require('request'),
      cheerio = require('cheerio'),
      session = require('express-session');

var bookings = require('./public/json/bookings.json');

// DOTENV
require('dotenv').config({path:path.join(__dirname,'/.env')});
const myAdmin = process.env.USER_ADMIN;
const myPass = process.env.USER_PASS;

// APP
const app = express();


// CONFIG
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public',express.static(path.join(__dirname, 'public')));

// use session
app.use(session({secret:'maggie-metleson', cookie:{}}));
app.use(function (req, res, next) {
    var err = req.session.error,
        msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});


// MIDDLEWARE
function authenticate(name,pass,callback) {
    if (name != myAdmin) {
        return callback(new Error('cannot find user'));
    } else  {
        if (pass != myPass) {
            return callback(new Error('invalid password'));
        } else {
            return callback(null,name);
        }
    }
}
function requiredAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error =' Access denied !';
        res.redirect('/login');
    }
}

// SOUNDCLOUD
// const soundUrl  = "https://soundcloud.com/maggiemusique";
// request(soundUrl,function(err,res,html) {
//     if (!err && res.statusCode == 200) {
//         var $ = cheerio.load(html);
//         var desc = $('.infoStats__description').text();
//         console.log(desc);
//     } else {
//         console.log(res.statusCode);
//         console.log('No internet connection');
//     }
// });

// BOOKINGS - READ JSON


// ROUTES
app.get('/',function(req,res) {
    res.render('index',{bookings:bookings['Bookings']});
});


// app.get('/test',function(req,res){
//     request(soundUrl,function(err,result,html){
//         res.send(html);
//         console.log(soundUrl);
//         console.log(result.statusCode);
//         console.log(result.headers);
//         console.log(html);
//     });
// });
